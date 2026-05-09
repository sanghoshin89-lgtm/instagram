import os
import json
import requests
from datetime import datetime
from dotenv import load_dotenv

# .env 파일에서 환경변수 로드
load_dotenv()

INSTAGRAM_ACCOUNT_ID = os.getenv('INSTAGRAM_ACCOUNT_ID')
INSTAGRAM_ACCESS_TOKEN = os.getenv('INSTAGRAM_ACCESS_TOKEN')

def publish_to_instagram():
    # 1. 게시물 데이터 로드
    file_path = 'posts.json'
    if not os.path.exists(file_path):
        print("posts.json 파일을 찾을 수 없습니다.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # 오늘 날짜 확인 (형식: 2026-05-11)
    today = datetime.now().strftime('%Y-%m-%d')
    
    # 2. 오늘 날짜이고 아직 발행되지 않은 게시물 찾기
    target_post = next((p for p in posts if p['date'] == today and not p.get('posted', False)), None)
    
    if not target_post:
        print(f"[{today}] 오늘은 발행할 게시물이 없거나 이미 완료되었습니다.")
        return

    print(f"[{target_post['topic']}] 업로드 프로세스 시작...")

    try:
        # 3. 미디어 컨테이너 생성 (이미지 업로드 예약)
        # 주의: image_url은 반드시 외부에서 접근 가능한 HTTPS URL이어야 합니다.
        container_url = f"https://graph.instagram.com/v19.0/{INSTAGRAM_ACCOUNT_ID}/media"
        payload = {
            'image_url': target_post['image_url'],
            'caption': target_post['caption'],
            'access_token': INSTAGRAM_ACCESS_TOKEN
        }
        
        response = requests.post(container_url, data=payload)
        response.raise_for_status()
        creation_id = response.json().get('id')

        import time
        print("Waiting 30 seconds for Instagram to process the media...")
        time.sleep(30)

        # 4. 미디어 발행 (실제 게시)
        publish_url = f"https://graph.instagram.com/v19.0/{INSTAGRAM_ACCOUNT_ID}/media_publish"
        publish_payload = {
            'creation_id': creation_id,
            'access_token': INSTAGRAM_ACCESS_TOKEN
        }
        
        publish_res = requests.post(publish_url, data=publish_payload)
        publish_res.raise_for_status()
        
        print(f"✅ 업로드 성공! 게시물 ID: {publish_res.json().get('id')}")

        # 5. 상태 업데이트 및 저장
        target_post['posted'] = True
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(posts, f, ensure_ascii=False, indent=2)

    except requests.exceptions.RequestException as e:
        print(f"❌ 업로드 실패: {e}")
        if e.response is not None:
            print(f"에러 상세: {e.response.json()}")

if __name__ == "__main__":
    publish_to_instagram()

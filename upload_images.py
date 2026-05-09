import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

IMGUR_CLIENT_ID = os.getenv('IMGUR_CLIENT_ID')

def upload_image_to_imgur(image_path):
    """Imgur에 이미지를 업로드하고 URL을 반환합니다."""
    url = "https://api.imgur.com/3/image"
    headers = {"Authorization": f"Client-ID {IMGUR_CLIENT_ID}"}
    
    with open(image_path, "rb") as file:
        data = file.read()
        
    response = requests.post(url, headers=headers, data={"image": data})
    if response.status_code == 200:
        return response.json()['data']['link']
    else:
        print(f"업로드 실패 ({image_path}):", response.json())
        return None

def update_posts_json():
    if not IMGUR_CLIENT_ID:
        print("❌ .env 파일에 IMGUR_CLIENT_ID를 먼저 입력해 주세요!")
        return

    # posts.json 로드
    with open('posts.json', 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # 폴더 내 이미지 파일 매핑 (day1, day2... 형식으로 매칭)
    image_files = {
        1: "day1_side_hustle.png",
        2: "day2_time_management.png",
        3: "day3_reading_habit.png",
        4: "day4_office_life.png",
        5: "day5_saving_money.png"
    }

    print("🚀 이미지 업로드 및 posts.json 업데이트를 시작합니다...")

    for post in posts:
        post_id = post['id']
        image_filename = image_files.get(post_id)
        
        if image_filename and os.path.exists(image_filename):
            # 이미 인터넷 주소(https)가 들어있지 않은 경우에만 업로드
            if not post['image_url'].startswith('https://picsum.photos') and not post['image_url'].startswith('http'):
                pass # 이미 처리된 것으로 간주하거나 무시
            
            print(f"[{post_id}번 게시물] {image_filename} 업로드 중...")
            link = upload_image_to_imgur(image_filename)
            
            if link:
                post['image_url'] = link
                print(f"✅ 성공: {link}")
        else:
            print(f"⚠️ {post_id}번에 해당하는 이미지 파일({image_filename})이 폴더에 없습니다.")

    # 결과 저장
    with open('posts.json', 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    print("\n✨ 모든 작업이 완료되었습니다! 이제 posts.json에 실제 이미지 주소들이 채워졌습니다.")

if __name__ == "__main__":
    update_posts_json()

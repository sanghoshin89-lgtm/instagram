import os
import json
import requests

def upload_to_catbox(file_path):
    """익명 호스팅 사이트(Catbox)에 이미지를 업로드합니다."""
    url = "https://catbox.moe/user/api.php"
    
    with open(file_path, 'rb') as f:
        files = {
            'reqtype': (None, 'fileupload'),
            'fileToUpload': (os.path.basename(file_path), f)
        }
        response = requests.post(url, files=files)
        
    if response.status_code == 200:
        return response.text.strip() # 업로드된 이미지 URL 반환
    else:
        print(f"❌ 업로드 실패 ({file_path}): {response.status_code}")
        return None

def run_full_automation():
    file_path = 'posts.json'
    if not os.path.exists(file_path):
        print("❌ posts.json 파일을 찾을 수 없습니다.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    # 폴더 내 이미지 파일 리스트
    image_mapping = {
        1: "day1_side_hustle.png",
        2: "day2_time_management.png",
        3: "day3_reading_habit.png",
        4: "day4_office_life.png",
        5: "day5_saving_money.png"
    }

    print("Starting automatic image upload (No sign-up required)...")

    updated = False
    for post in posts:
        post_id = post['id']
        img_name = image_mapping.get(post_id)

        # 로컬 파일이 실제로 있는지 확인
        if img_name and os.path.exists(img_name):
            # 이미 인터넷 주소가 채워져 있지 않은 경우에만 실행 (또는 강제 업데이트 가능)
            print(f"[{post_id}] {img_name} Uploading...")
            link = upload_to_catbox(img_name)
            
            if link:
                post['image_url'] = link
                print(f"Success: {link}")
                updated = True
        else:
            print(f"Warning: {img_name} not found. Skipping.")

    if updated:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(posts, f, ensure_ascii=False, indent=2)
        print("\nAll URLs updated in posts.json!")
    else:
        print("\n🤔 업데이트할 파일이 없거나 모두 완료된 상태입니다.")

if __name__ == "__main__":
    run_full_automation()

# 라이브러리 import
from flask import Flask, Response, request # flask 모듈에서 필요한 클래스와 객체를 가져옴
import pandas as pd # 데이터 처리를 위한 pandas 라이브러리
import numpy as np # 샘플링과 수학적 계산을 위한 numpy 라이브러리
import json # JSON 응답을 생성하기 위한 라이브러리
from collections import OrderedDict # 열 순서를 유지하기 위한 OrderedDict 클래스
from flask_cors import CORS
<<<<<<< HEAD
=======

>>>>>>> f26cd1ea5678c7bca5e9584edf6bdbfa1e638bf6
app = Flask(__name__) # flask 앱 초기화
CORS(app)
# 데이터 파일 경로 (추후 인터넷 URL로 변경 예정)
DATA_URL = "../data/lottoDB.csv"

##############################################################################################################################################
# 함수 선언부 #
##############################################################################################################################################

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 데이터를 로드하고 정렬하는 함수
# 메서드 : CSV 파일을 pandas 데이터프레임으로 로드 후 최신 날짜 기준으로 정렬
# 반환값 : sorted_data -> 최신 날짜로 정렬된 data 프레임
def load_and_sort_data():
    # CSV 파일을 pandas 데이터프레임으로 로드
    lotto_data = pd.read_csv(DATA_URL)

    # 최신 날짜 기준으로 정렬 (마지막 줄이 첫 번째 줄로 올라옴)
    sorted_data = lotto_data.iloc[::-1].reset_index(drop=True)
    return sorted_data

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 특정한 확률을 적용하여 숫자 6개를 뽑는 함수 (1회 추출)
# 메서드 : 추첨 데이터에서 필요한 열만 추출 -> 모든 숫자를 1차원 배열로 변환 ->
#          숫자별 등장 횟수 계산 -> 총 추첨 횟수를 통한 각 숫자의 확률 계산(빈도 수) ->
#          확률에 기반해 6개의 숫자를 샘플링하여 추출 -> 리스트로 반환 
# 반환값 : 리스트로 반환된 1회의 추출 숫자 수
def single_draw(data):
    # 추첨 데이터에서 필요한 열만 추출
    numbers = data[["one", "two", "three", "four", "five", "six"]]
    # 모든 숫자를 1차원 배열로 변환 
    all_numbers = numbers.values.flatten()
    # 숫자별 등장 횟수 계싼
    number_counts = pd.Series(all_numbers).value_counts().sort_index()
    # 총 추첨 횟수
    total_draws = len(data)
    # 각 숫자의 확률 계산 (빈도 수 계산)
    number_probabilities = number_counts / (6 * total_draws)
    # 확률에 기반하여 6개의 숫자를 샘플링
    sampled_numbers = np.random.choice(
        number_counts.index, size=6, replace=False, p=number_probabilities.values
    )
    # 리스트로 반환
    return sampled_numbers.tolist()

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 특정 범위 횟수안에서 등장한 숫자를 가지고 숫자 6개를 뽑는 함수
# 메서드 : 특정 범위를 선택 (최근 n회의 데이터 선택) -> 이후 single_draw와 동일
def limited_draw(data, recent_count):
    # 최근 n회 데이터만 선택
    recent_data = data.head(recent_count)
    numbers = recent_data[["one", "two", "three", "four", "five", "six"]]
    all_numbers = numbers.values.flatten()
    
    # 숫자별 빈도 계산 및 확률 계산
    number_counts = pd.Series(all_numbers).value_counts().sort_index()
    total_draws = len(recent_data)
    number_probabilities = number_counts / (6 * total_draws)
    
    # 샘플링
    sampled_numbers = np.random.choice(
        number_counts.index, size=6, replace=False, p=number_probabilities.values
    )
    return sampled_numbers.tolist()

##############################################################################################################################################
# API 반환부 #
##############################################################################################################################################

<<<<<<< HEAD
# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 복권 데이터를 정렬된 형식으로 반환하는 API
# 입력값 : 없음
# 메서드 : 1. 데이터를 로드하고 최신 날짜 기준으로 정렬 / 2. 열 순서를 유지하여 JSON 포맷으로 변환
# 반환값 : JSON 형식으로 정렬된 복권 데이터
@app.route("/api/data", methods=["GET"])
def get_data():
=======
# Backend 코드 수정 
# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 수정일 : 2024-12-12
# 목  적 : 복권 데이터를 정렬된 형식으로 반환하는 API 
# 입력값 : 없음
# 수정 전 메서드 : 1. 데이터를 로드하고 최신 날짜 기준으로 정렬 / 2. 열 순서를 유지하여 JSON 포맷으로 변환
# 수정 후 메서드 : 1. 데이터를 로드 후 페이지 번호와 한 페이지당 항목 수를 쿼리파라미터로 받음 
#                 2. 데이터의 시작과 끝 인덱스 계산 / 3. 데이터가 없을 경우 에러처리 / 4. JSON 포맷으로 변환하여 전송
# 반환값 : JSON 형식으로 정렬된 복권 데이터
@app.route("/api/data", methods=["GET"])
def get_paginated_data():
>>>>>>> f26cd1ea5678c7bca5e9584edf6bdbfa1e638bf6
    # 최신 데이터 로드
    data = load_and_sort_data()
    if data is None:
        return Response(json.dumps({"error": "데이터를 로드할 수 없습니다."}), status=500, mimetype='application/json')
<<<<<<< HEAD
    
    # 열 순서 유지
    column_order = ["Index", "date", "one", "two", "three", "four", "five", "six", "bonus"]
    if set(column_order) == set(data.columns):
        data = data[column_order]
    
    # JSON으로 변환 (OrderedDict를 사용해 열 순서 유지)
    json_data = [
        OrderedDict((col, row[col]) for col in column_order) for _, row in data.iterrows()
    ]
    
=======
    # 페이지 번호와 한 페이지당 항목 수를 쿼리 파라미터로 받기 (기본값: page=1, limit=10)
    page = request.args.get("page", default=1, type=int)
    limit = request.args.get("limit", default=10, type=int)
    # 데이터의 시작 및 끝 인덱스 계산
    start_index = (page - 1) * limit
    end_index = start_index + limit
    # 해당 페이지에 해당하는 데이터 추출
    paginated_data = data.iloc[start_index:end_index]
    # 데이터가 없을 경우 에러 처리
    if paginated_data.empty:
        return Response(json.dumps({"error": "더 이상 데이터가 없습니다."}), status=404, mimetype='application/json')
    # 열 순서 유지
    column_order = ["Index", "date", "one", "two", "three", "four", "five", "six", "bonus"]
    if set(column_order) == set(data.columns):
        paginated_data = paginated_data[column_order]
    # JSON으로 변환 (OrderedDict를 사용해 열 순서 유지)
    json_data = [
        OrderedDict((col, row[col]) for col in column_order) for _, row in paginated_data.iterrows()
    ]
>>>>>>> f26cd1ea5678c7bca5e9584edf6bdbfa1e638bf6
    # JSON 문자열로 변환 후 응답
    return Response(json.dumps(json_data, ensure_ascii=False), mimetype='application/json')

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 확률에 기반하여 숫자 6개를 1회 추출 하는 API
# 입력값 : 없음
# 메서드 : 1. 전체 데이터를 로드 / 2. 숫자 6개를 샘플링하는 single_draw 함수 호출
# 반환값 : JSON 형식으로 반환된 숫자 6개
@app.route("/api/single-draw", methods=["GET"])
def get_single_draw():
    data = load_and_sort_data()
    draw_result = single_draw(data)
    return Response(json.dumps({"single_draw": draw_result}, ensure_ascii=False), mimetype='application/json')

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 확률에 기반하여 숫자 6개를 5번 추출하는 API
# 입력값 : 없음
# 메서드 : 1. 전체 데이터를 로드 / 2. 숫자 6개를 5번 샘플링하여 리스트로 반환
# 반환값 : JSON 형식으로 반환된 숫자 6개를 5번 추출한 결과
@app.route("/api/multiple-draws", methods=["GET"])
def get_multiple_draws():
    data = load_and_sort_data()
    results = []
    for _ in range(5):
        results.append(single_draw(data))
    return Response(json.dumps({"multiple_draws": results}, ensure_ascii=False), mimetype='application/json')

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 특정 범위 내에서 숫자 6개를 추출하는 API
# 입력값 : n (URL 쿼리 파라미터, 기본값 100 -> 기본값 100 추후 삭제 예정)
# 메서드 : 1. 최근 n회의 데이터를 로드 / 2. 제한된 범위 내에서 숫자 6개를 샘플링하는 limited_draw 함수 호출
# 반환값 : JSON 형식으로 반환된 숫자 6개
@app.route("/api/draw-limited", methods=["GET"])
def get_limited_draw():
    # 최근 n회 값 가져오기
    n = request.args.get("n", default=100, type=int)
    data = load_and_sort_data()
    
    # n회 이상 요청 시 전체 데이터로 제한
    if n > len(data):
        n = len(data)
    
    # 숫자 추출
    draw_result = limited_draw(data, n)
    return Response(json.dumps({"limited_draw": draw_result}, ensure_ascii=False), mimetype='application/json')

# 작성자 : 박건혁
# 작성일 : 2024-12-09
# 목  적 : 특정 범위 내에서 숫자 6개를 5번 추출하는 API
# 입력값 : n (URL 쿼리 파라미터, 기본값 100 -> 기본값 100 추후 삭제 예정)
# 메서드 : 1. 최근 n회의 데이터를 로드 / 2. 제한된 범위 내에서 숫자 6개를 5번 샘플링하는 `limited_draw` 함수 호출 
# 반환값 : JSON 형식으로 반환된 숫자 6개를 5번 추출한 결과
@app.route("/api/draw-limited-multiple", methods=["GET"])
def get_limited_multiple_draws():
    # 최근 n회 값 가져오기
    n = request.args.get("n", default=100, type=int)
    data = load_and_sort_data()
    
    # n회 이상 요청 시 전체 데이터로 제한
    if n > len(data):
        n = len(data)
    
    # 5번 추출
    results = []
    for _ in range(5):
        results.append(limited_draw(data, n))
    
    return Response(json.dumps({"limited_multiple_draws": results}, ensure_ascii=False), mimetype='application/json')

# Flask 앱 실행
if __name__ == "__main__":
    app.run(debug=True)
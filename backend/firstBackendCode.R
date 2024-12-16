# 현재 작업 디렉토리 확인 및 설정
getwd()
setwd("E:/SideProject_lotto/backend/")
getwd()

# 데이터 로드
lottoData <- read.csv("../data/lottoDB.csv", header = TRUE)

# 분기별로 필터링
lottoData

# 각 숫자별로 데이터를 처리하기 위해 필요한 열만 가져오기
numbers <- lottoData[, c("one", "two", "three", "four", "five", "six")]

# 모든 숫자를 하나의 벡터로 변환
all_numbers <- as.vector(unlist(numbers))

# 숫자별 카운트 계산
number_counts <- table(all_numbers)

# 전체 추첨 횟수
total_draws <- nrow(lottoData)

# 각 숫자의 당첨 확률 계산
number_probabilities <- number_counts / (6 * total_draws)

# 특정 숫자가 등장한 추첨 회차를 구하는 함수 (수정)
get_draw_indices <- function(num, lottoData) {
  which(apply(lottoData[, c("one", "two", "three", "four", "five", "six")], 1, function(row) num %in% row)) 
}

# 각 숫자별로 당첨된 회차를 계산
number_draws <- lapply(as.numeric(names(number_counts)), function(num) get_draw_indices(num, lottoData))

# 결과를 데이터프레임으로 구성
result <- data.frame(
  Number = as.numeric(names(number_counts)),      # 숫자
  Count = as.numeric(number_counts),              # 숫자가 나온 총 횟수
  Probability = as.numeric(number_probabilities), # 숫자의 당첨 확률
  Draws = I(number_draws)                         # 당첨된 회차 리스트
)


sample(result$Number, size = 6, replace = F, prob = result$Probability)





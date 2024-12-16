# 필요한 라이브러리
library(ggplot2)
install.packages("svglite")
library(svglite)
# 숫자별 배경색 설정 함수
get_background_color <- function(number) {
  if (number >= 1 && number <= 10) {
    return("#F18F06")  # 1 ~ 10
  } else if (number >= 11 && number <= 20) {
    return("#155CC8")  # 11 ~ 20
  } else if (number >= 21 && number <= 30) {
    return("#C03E1A")  # 21 ~ 30
  } else if (number >= 31 && number <= 40) {
    return("#5E656D")  # 31 ~ 40
  } else if (number >= 41 && number <= 45) {
    return("#1CAD12")  # 41 ~ 45
  } else {
    stop("Invalid number!")  # 범위를 벗어난 숫자 처리
  }
}

# 공 그림 그리는 함수
draw_ball <- function(number) {
  # 배경색 가져오기
  bg_color <- get_background_color(number)
  
  # 플롯 생성 (테두리 제거를 위해 shape = 16 사용)
  p <- ggplot(data.frame(x = 0, y = 0), aes(x, y)) +
    geom_point(size = 20, shape = 16, color = bg_color) +  # shape = 16으로 테두리 없는 점
    annotate("text", x = 0, y = 0, label = number, color = "white", size = 8, fontface = "bold") +
    theme_void() +
    theme(plot.margin = unit(c(0, 0, 0, 0), "lines"))
  
  return(p)
}

# 테스트: 숫자 5를 그리기
draw_ball(5)
getwd()
setwd("E:/SideProject_lotto/backend/ball/")
# 전체 45개를 저장하는 코드
for (i in 1:45) {
  p <- draw_ball(i)
  # 플롯 확인 (한 번에 하나씩)
  print(p)
  
  # 파일 저장 (폴더를 미리 생성해야 함)
  ggsave(filename = paste0("ball_", i, ".svg"), plot = p, width = 3, height = 3, dpi = 200)
<<<<<<< HEAD
}
=======
}
>>>>>>> f26cd1ea5678c7bca5e9584edf6bdbfa1e638bf6

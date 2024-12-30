# 프로젝트 명

## lottery

### 로또 복권 자동 추첨기

동행복권 사이트로부터 얻어낸 로또 데이터를 기반으로 번호의 출현 빈도에 따라 확률을 보정하여 추첨 결과를 제공하는 웹사이트 또한 사용자가 지정한 특정 회차 범위를 기준으로 추첨할 수 있는 옵션을 추가로 제공함.

<hr>

### 사용 기술

<span style="font-size: 1.5em; font-weight: bold;">Stack</span>

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white) ![NumPy](https://img.shields.io/badge/NumPy-013B3B?style=for-the-badge&logo=numpy&logoColor=white) ![Flask-Cors](https://img.shields.io/badge/Flask_Cors-000000?style=for-the-badge&logo=flask&logoColor=white)

![R](https://img.shields.io/badge/R-276DC3?style=for-the-badge&logo=r&logoColor=white) ![ggplot2](https://img.shields.io/badge/ggplot2-ED6A5C?style=for-the-badge&logo=ggplot2&logoColor=white) ![svglite](https://img.shields.io/badge/svglite-4B93D3?style=for-the-badge&logo=svg&logoColor=white)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-%2338B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![PythonAnywhere](https://img.shields.io/badge/PythonAnywhere-306998?style=for-the-badge&logo=python&logoColor=white) ![Git Bash](https://img.shields.io/badge/Git_Bash-F8F8F8?style=for-the-badge&logo=gitbash&logoColor=black) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)

- **Programming Language : Python (3.9)**
- **Library : numpy (1.26.4), pandas (2.2.3)**
- **WEB : TypeScript, JavaScript, Vite, React, Flask (3.0.3), TailwindCSS(2.2.19)**
- **IDE : Visual Studio Code (1.96.2)**
- **Communication : Notion, Figma, Git, Github**
- **Deployment : <span style="color: purple;">**PythonAnywhere (Backend)**</span>, <span style="color: skyblue;">**GitHub Pages (Frontend)**</span>**
<hr/>

## 목차

- **개발개요**
- **프로젝트 참여자**
  - BTBIIT
  - YSangH
- **웹 페이지 배포**
  - 백엔드 배포
  - 프론트 엔드 배포
- **웹 페이지 화면 구성**
- **결과 링크**
<hr>

### 개발 개요

이 프로젝트는 데이터를 기반으로 로또 번호를 추첨하는 웹 서비스를 개발하며 데이터 분석과 웹 개발 기술을 학습하고 응용하기 위해 시작됨.  
또한 사용자 친화적인 UI와 API 통합 설계를 통해 효율적이고 직관적인 시스템을 구현함.

<hr>

### 프로젝트 참여자

<span style="font-size: 1.2em; font-weight: bold;">BTBIIT</span><br>
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) : https://github.com/BTBIIT  
![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white) : [rjsgur789@gmail.com](mailto:rjsgur789@gmail.com)  
![Blog](https://img.shields.io/badge/Blog-2B90B9?style=for-the-badge&logo=tistory&logoColor=white) : https://code-palette.tistory.com/

<span style="font-size: 1.0em; font-weight : bold;">역할</span>

- **Backend Deploy**
  - 작성 완료된 Python 코드를 무료호스팅 사이트인 PythonAnyWhere를 통해 배포
- **화면 설계 보조**
  - Frontend 개발자의 화면 설계를 Figma로 같이 협업하여 화면 설계에 참여함
- **R코드를 통한 구성요소 제작**
  - R코드를 활용하여 필요한 SVG 파일을 생성하고 여백을 제거하는 등의 역할로 애니메이션 및 공 이미지와 같은 파일들 생성
- **코드리뷰 참여 및 이슈해결**
  - Frontend 및 Backend 코드에서 이슈 발생 시 이슈를 해결하는 역할을 도맡아 진행함
- **당첨기록 페이지 작성**
  - Frontend 부분의 frontend/src/pages/Record.tsx 파일 제작 ([링크](https://github.com/BTBIIT/lottery/blob/main/frontend/src/pages/Record.tsx))

◎ 백엔드 폴더 구조

```
backend/ - 백엔드에서 사용된 코드 및 파일 Directory
├── drawBall.R - Ball의 SVG 파일을 생성해주는 R코드
├── firstBackendCode.R - lotto_service.py가 될 초기 R 코드
├── lotto_service.py - 배포 전 최종 백엔드 파이썬 코드
├── lotto_service_deploy.py - 배포 버전 최종 백엔드 파이썬 코드
├── requirements.txt - 파이썬에 필요한 라이브러리 모음 텍스트 파일
data/ - 기존 로또 번호 데이터 csv 파일이 위치한 Directory
└── lottoDB.csv - 매주 토요일마다 업데이트 되는 로또번호 데이터 csv 파일
```

<span style="font-size: 1.2em; font-weight: bold;">YSangH</span><br>
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) : https://github.com/YSangH  
![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white) : [ysh940129@gmail.com](mailto:ysh940129@gmail.com)  
![Blog](https://img.shields.io/badge/Blog-2B90B9?style=for-the-badge&logo=tistory&logoColor=white) : https://ysh0129.tistory.com

<span style="font-size: 1.0em; font-weight : bold;">역할</span>

- **레이아웃 배치 및 기획**
  - Figma를 이용하여 레이아웃의 구성과 기능별 배치
- **Frontend 코드 작성**
  - React에서 tsx 코드를 이용한 기능 구현 및 TailwindCSS를 이용한 레이아웃 스타일 작성
- **코드리뷰 참여 및 이슈해결**
  - Frontend 및 Backend 코드에서 이슈 발생 시 이슈를 해결하는 역할을 도맡아 진행함
- **추첨기 페이지 작성**
  - Frontend 부분의 frontend/src/pages/Record.tsx 파일 제작 ([링크](https://github.com/BTBIIT/lottery/blob/main/frontend/src/pages/DrawPage.tsx))
- **React 폴더구조**
  - Frontend 폴더 컴포넌트와 페이지 등 기획

◎ 프론트 폴더 구조

```
src/
├── Assets/ - svg 이미지 파일 폴더
├── components/ - 재사용 가능한 UI 컴포넌트를 모아놓은 폴더
│    ├── Animation.tsx - 추첨기의 애니메이션 효과 컴포넌트
│    ├── Button.tsx - 추첨 버튼 컴포넌트
│    ├── Button.css - 추첨 버튼 컴포넌트 동작 후 애니메이션 css파일
│    ├── DropDown.tsx - 추첨 옵션 컴포넌트 (일반, 특수 추첨)
│    ├── Header.tsx - 헤더 컴포넌트 (탭, 테마 전환 스위치)
│    └── Result.tsx - 결과 로그 컴포넌트
├── Pages/ - 페이지 모아놓은 폴더
│    ├── DrawPage.tsx - 추첨기 페이지
│    └── Record.tsx - 당첨기록 페이지
├── declarations.d.ts - 타입스크립트에서 svg파일 사용 설정 및 파일을 동적으로 가져오기 위한 Vite의 기능
├── App.css - App.tsx의 css파일
└── App.tsx - 전체 라우팅 및 전역 상태 관리
```

<hr>

## 웹 페이지 배포

### Backend

- **호스팅 플랫폼**: PythonAnywhere
- **API URL 목록**:

| API 이름       | 설명                                            | URL                                                                         |
| -------------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| 당첨 기록 조회 | 지금까지의 당첨 기록을 가져옴                   | [API 링크](https://lottokorea.pythonanywhere.com/api/data)                  |
| 일반 추첨(1회) | 모든 회차를 기준으로 한 번의 번호 추첨          | [API 링크](https://lottokorea.pythonanywhere.com/api/single-draw)           |
| 일반 추첨(5회) | 모든 회차를 기준으로 다섯 번의 번호 추첨        | [API 링크](https://lottokorea.pythonanywhere.com/api/multiple-draws)        |
| 특수 추첨(1회) | 사용자가 입력한 범위 내에서 한 번의 번호 추첨   | [API 링크](https://lottokorea.pythonanywhere.com/api/draw-limited)          |
| 특수 추첨(5회) | 사용자가 입력한 범위 내에서 다섯 번의 번호 추첨 | [API 링크](https://lottokorea.pythonanywhere.com/api/draw-limited-multiple) |

---

### Frontend

- **호스팅 플랫폼**: GitHub Pages
- **배포 URL**: [https://btbiit.github.io/lottery/](https://btbiit.github.io/lottery/)

<hr>

### 웹 페이지 화면 구성

![페이지 이미지](https://github.com/BTBIIT/lottery/blob/main/page.png?raw=true)

1. **추첨 버튼**

   - **일반 추첨**
     - 모든 회차의 번호 출현 확률에 따라 추첨
     - **API**: single-draw, multiple-draws
   - **특수 추첨**
     - 사용자가 입력한 범위(최근 n회차)만을 기준으로 추첨
     - **API**: draw-limited, draw-limited-multiple

2. **추첨 기록**

   - 사용자가 진행한 추첨 기록을 저장 및 표시 (localStorage 사용)

3. **다크 모드**
   - 눈에 편안한 다크 모드 지원

<hr>

### 결과 링크

👉 [배포된 웹 페이지 주소](https://btbiit.github.io/lottery/)

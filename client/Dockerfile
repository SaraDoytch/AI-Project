# frontend/Dockerfile

# שלב 1: בניית אפליקציית React עם Node
FROM node:18 as build

WORKDIR /app

# העתקת package.json ו-package-lock.json
COPY package*.json ./

# התקנת תלויות
RUN npm install

# העתקת שאר הקבצים
COPY . .

# בניית הפרויקט לייצוא (production build)
RUN npm run build

# שלב 2: שרת nginx להפצת הסטטיים
FROM nginx:alpine

# העתקת קבצי ה-build ל-nginx
COPY --from=build /app/build /usr/share/nginx/html

# חשיפת פורט 80
EXPOSE 80

# הפעלת nginx
CMD ["nginx", "-g", "daemon off;"]

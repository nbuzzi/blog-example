@echo off
echo F|xcopy /E /H /C /I "src/controllers/login/views" "build/controllers/login/views"
echo F|xcopy /E /H /C /I "src/controllers/posts/views" "build/controllers/posts/views"
echo F|xcopy /E /H /C /I "src/scripts" "build/scripts"
echo F|xcopy /E /H /C /I "src/styles" "build/styles"
exit
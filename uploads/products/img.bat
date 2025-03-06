@echo off
setlocal enabledelayedexpansion

:: 设置原始图片名称（假设脚本和图片在同一目录下）
set "sourceImage=pp.jpg"

:: 设置目标文件夹路径（假设目标文件夹也在脚本所在目录下）
set "targetFolder=target"

:: 设置要复制的图片数量
set "numberOfCopies=20"

:: 获取脚本所在的目录路径
set "scriptPath=%~dp0"

:: 检查目标文件夹是否存在，如果不存在则创建
if not exist "%scriptPath%\%targetFolder%" mkdir "%scriptPath%\%targetFolder%"

:: 复制并重命名图片
for /L %%i in (1,1,%numberOfCopies%) do (
    set "newName=product-%%i.jpg"
    copy "%scriptPath%\%sourceImage%" "%scriptPath%\%targetFolder%\!newName!"
)

echo 复制完成！
pause
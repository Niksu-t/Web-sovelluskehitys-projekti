*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/src/pages/Login.html
    Get Title      ==    Vite App  
    Type Text      [name="username"]        ${Username}    delay=0.1 s 
    Type Text    [name="password"]    ${Password}     delay=0.1 s
    Click    input[name="submit"]     
    Get Text       css=dialog.info_dialog p    ==    Login successful
    Click    css=dialog.info_dialog button[autofocus]
    [Teardown]    Close Browser
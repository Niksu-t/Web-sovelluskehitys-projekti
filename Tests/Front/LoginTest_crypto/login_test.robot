*** Settings ***
Library     Browser    auto_closing_level=KEEP
Library     CryptoLibrary    variable_decryption=True

*** Variables ***
${Username}    crypt:ITqT8iiOUb7EYXFAutJYtS123BvewDP46UEewbi9JgVGPSrMtCMUnfKosV2vPwOsGV8YiGX2LkBr4dE=
${Password}    crypt:RKYGjKorvS4dpV7Bj70zIoCXvZNNsqs6AIzswCxrVh+cQnE9bf5e1hwm7u4bs+g83l5w4Wj6e7mh


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
*** Settings ***
Library     Browser
Resource    Keywords.robot 

*** Test Cases ***
Login First
    New Browser    chromium    headless=No  
    New Page       http://localhost:5173/src/pages/Login.html
    Get Title      ==    Vite App  
    Type Text      [name="username"]        ${Username}    
    Type Text    [name="password"]    ${Password}     
    Click    input[name="submit"]     
    Get Text       css=dialog.info_dialog p    ==    Login successful
    Click    css=dialog.info_dialog button[autofocus]
    New Page    ${url}
    Type Text    id=Date    25-03-2025
    Type Text      id=mood        ${mood}    
    Type Text    id=weigth    ${weight}    
    Type Text    id=sleephours    ${sleep}    
    Type Text    id=notes    ${notes}    
    Click    css=form.entryform input[type="submit"]
    Sleep    5 seconds

    
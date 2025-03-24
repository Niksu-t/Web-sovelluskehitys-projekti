*** Settings ***
Library    Browser
Resource    Keywords.robot


*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Type Text      [name="my-text"]        ${Username}    
    Type Secret    [name="my-password"]    $Password      
    Type Text      [name="my-textarea"]    ${Message}    delay=0.1s
    Select Options By    select[name="my-select"]    value    1    
    Upload File By Selector   input[type="file"]    Keywords.robot
    Click    input[name="my-check"]
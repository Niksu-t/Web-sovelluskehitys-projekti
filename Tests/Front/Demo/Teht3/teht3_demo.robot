*** Settings ***
Library    Browser
Resource    Keywords.robot


*** Test Cases ***
Dropdown Menus
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Select Options By    select[name="my-select"]    value    1    
    Click    css=.form-control[list="my-options"]
    Type Text    css=.form-control[list="my-options"]    New York
    Press Keys    css=.form-control[list="my-options"]    Enter

File Upload
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form  
    Upload File By Selector   input[type="file"]    Keywords.robot

Radio buttons and Checkbox
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form
    Click    id=my-check-2
    Click    id=my-check-1
    Click    id=my-radio-2
    Click    id=my-radio-1

Date Picker
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form
    Click    css=.form-control[name="my-date"]
    Click    xpath=//td[normalize-space(text())='25' and not(contains(@class, 'old'))]

Color Picker
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form
    Click    input[name="my-colors"]
    Sleep     2 seconds
    Fill Text    input[name="my-colors"]    ${color} 
    ${color_value}=    Get Value    input[name="my-colors"]
    Should Be Equal    ${color_value}    ${color}

Test Range Input
    New Browser    chromium    headless=No  
    New Page       https://www.selenium.dev/selenium/web/web-form.html 
    Get Title      ==    Web form
    Click    input[name="my-range"]
    Type Text    input[name="my-range"]    7
    ${range_value}=    Get Value    input[name="my-range"]
    Should Be Equal    ${range_value}    7
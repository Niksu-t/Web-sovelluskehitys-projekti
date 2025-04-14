
*** Settings ***
Library         RequestsLibrary
Library         Collections


Suite Setup    Create Session    test    http://127.0.0.1:3000/


*** Test Cases ***

Login 
    ${data}=    Create dictionary    title=request    username=meloonitest    password=melooni20
    ${resp}=    POST On Session    test    /api/auth/login    json=${data}    expected_status=anything
    Log    ${resp.json()}
    ${token}    Set Variable    ${resp.json()}[token]
    Log    ${token}
    Set Suite Variable     ${token}

    Status Should Be    200    ${resp}

Get Diary entries
    ${headers}=    Create dictionary    Authorization=Bearer ${token}
    ${resp}=    GET On Session    test    /api/entries    headers=${headers}     expected_status=anything
    Log    ${resp.json()}


Add diary entry
    ${headers}=    Create dictionary    Authorization=Bearer ${token}
    ${data}=       Create dictionary    entry_date=2025-04-14    mood=Happy    weight=60    sleep_hours=8    notes=test
    ${resp}=       POST On Session    test    /api/entries    headers=${headers}    json=${data}    expected_status=anything
    Log    ${resp.json()}

Update diary entry
    ${entry_id}    Set Variable    20
    ${headers}=    Create dictionary    Authorization=Bearer ${token}
    ${data}=       Create dictionary    entry_date=2025-04-14    mood=Happy    weight=60    sleep_hours=8    notes=I like robot
    ${resp}=       PUT On Session    test    /api/entries/${entry_id}    headers=${headers}    json=${data}    expected_status=anything
    Log    ${resp.json()}

Delete entry
    ${entry_id}    Set Variable    29
    ${headers}=    Create dictionary    Authorization=Bearer ${token}
    ${resp}=       Delete On Session    test    /api/entries/${entry_id}    headers=${headers}   expected_status=anything
    
    Status Should Be    204    ${resp}
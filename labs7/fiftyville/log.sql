-- Keep a log of any SQL queries you execute as you solve the mystery.

-- first info from walkthrough, theft happened at 10:15 am
SELECT description
FROM crime_scene_reports
WHERE month = 7 AND day = 28
AND street = 'Humphrey Street';



-- read transcript of witnesses
SELECT name, transcript
FROM interviews
WHERE month = 7 AND day = 28
AND transcript LIKE '%bakery%';



-- according to Ruth...
SELECT minute, license_plate
FROM bakery_security_logs
WHERE month = 7 AND day = 28 AND hour = 10 AND minute < 30
AND activity = 'exit';



-- according to Eugene...
SELECT *
FROM atm_transactions
WHERE month = 7 AND day = 28
AND atm_location = 'Leggett Street' AND transaction_type = 'withdraw';



-- find who used the atm...
SELECT person_id FROM bank_accounts WHERE account_number IN (SELECT account_number
FROM atm_transactions WHERE month = 7 AND day = 28 AND atm_location = 'Leggett Street'
AND transaction_type = 'withdraw');



-- according to Raymond about the call...
SELECT *
FROM phone_calls
WHERE month = 7 AND day = 28
AND duration < 60;



-- according to Raymond about the flight...
SELECT *
FROM flights
WHERE month = 7 AND day = 29
ORDER BY hour LIMIT 1;



-- finding the destination airport of flight id 36...
SELECT *
FROM airports
WHERE id = 4;



-- checking passport number of the thief...
SELECT *
FROM passengers
WHERE flight_id = 36;



-- narrowing the option by the passport no., phone no., ...
SELECT *
FROM people
WHERE passport_number IN (SELECT passport_number FROM passengers WHERE flight_id = 36)
AND phone_number IN (SELECT caller FROM phone_calls WHERE month = 7 AND day = 28 AND duration < 60)
AND license_plate IN (SELECT license_plate FROM bakery_security_logs WHERE month = 7
AND day = 28 AND hour = 10 AND minute < 30 AND activity = 'exit')
AND id IN (SELECT person_id FROM bank_accounts WHERE account_number IN (SELECT account_number
FROM atm_transactions WHERE month = 7 AND day = 28 AND atm_location = 'Leggett Street'
AND transaction_type = 'withdraw'));


-- Bruce is the thief and let's see who he called...
SELECT caller, receiver
FROM phone_calls
WHERE month = 7 AND day = 28
AND duration < 60 AND caller LIKE '%(367)%';


-- find the person who hold number (375)...
SELECT *
FROM people
WHERE phone_number = '(375) 555-8161';

-- IT'S ROBIN AND BRUCE!
def main():
    time = input("What time is it? ")

    if convert(time) >= 7 and convert(time) <= 8:
        print("breakfast time")
    elif convert(time) >= 12 and convert(time) <= 13:
        print("lunch time")
    elif convert(time) >= 18 and convert(time) <= 19:
        print("dinner time")

def convert(time):
    nums = time.strip().lower().split(":")
    hour = float(nums[0])
    minute = float(nums[1].split()[0])
    if len(nums[1].split()) > 1:
        if nums[1].split()[1][0] == "a" and hour == 12:
            hour = 0
        elif nums[1].split()[1][0] == "p" and hour != 12:
            hour += 12
    return hour + minute / 60


if __name__ == "__main__":
    main()
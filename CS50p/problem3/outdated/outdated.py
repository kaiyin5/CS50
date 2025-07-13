def main():
    month_in_English = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    # this function accepts 2 date formats
    # (1) MM/DD/YYYY - 9/8/1636 => 1636-09-08
    # (2) Month Date, Year - September 8, 1636 => 1636-09-08
    y, m, d = None, None, None
    dateList = None
    while True:
        try:
            # ask user for prompt
            date = input("Date: ")
            # handle empty input
            if not date:
                break
            # handle spliting of the MM/DD/YYYY format
            if "/" in date:
                dateList = date.split("/")
                # handle the month convertion
                m = int(dateList[0])
            # handle spliting of the Month Date, Year format
            elif "," in date:
                dateList = date.split()
                # hard code to remove the , symbol
                dateList[1] = dateList[1].replace(",", "")
                # handle the month convertion
                m = month_in_English.index(dateList[0]) + 1
            # handle day and year
            d, y = int(dateList[1]), int(dateList[2])
            # final validation of the month and day value and break the loop
            if (d > 31 or d < 0 or m > 12 or m < 0):
                raise ValueError("day or month out of range")
            else:
                break
        except TypeError:
            pass
        except ValueError:
            pass
        except EOFError:
            break
    # handle None y, m, d cases
    try:
        print(f"{y}-{m:02}-{d:02}")
    except TypeError:
        pass
    return

main()


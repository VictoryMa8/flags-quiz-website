def bubble_sort(arr):
    temp = 0
    num_swaps = 1
    while num_swaps > 0:
        num_swaps = 0
        for i in range(len(arr) - 1):
            if arr[i] > arr[i+1]:
                temp = arr[i]
                arr[i] = arr[i+1]
                arr[i+1] = temp
                num_swaps += 1
    return arr   

def main():
    arr1 = [3, 9, 1, 2, 10, 7, 5, 4, 8, 6]
    print(arr1)
    print(bubble_sort(arr1))
    print("Enter your name: ")
    name = input()
    while name != "Victor":
        print("Erm.. try again.. you are not cool guy Victor")
        print("Enter your name: ")
        name = input()
    print("Ah I see that you are the cool guy Victor")

if __name__ == "__main__":
    main()

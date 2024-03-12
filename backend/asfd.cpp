#include <iostream>
#include <vector>
#include <algorithm>

// Function to check if a vector is a palindrome
bool isPalindrome(const std::vector<int>& vec) {
    for (int i = 0; i < vec.size() / 2; ++i) {
        if (vec[i] != vec[vec.size() - i - 1]) return false;
    }
    return true;
}

// Function to find the largest x for which P(A, x) forms a palindrome
int largestXForPalindrome(const std::vector<int>& A, int n) {
    int maxX = 0;
    
    // Iterate through possible values of x
    for (int x = 0; x <= *std::max_element(A.begin(), A.end()); ++x) {
        std::vector<int> modArray(n);
        
        // Calculate the modulo of each element in A with x
        for (int i = 0; i < n; ++i) {
            modArray[i] = A[i] % x;
        }
        
        // Check if the resulting array is a palindrome
        if (isPalindrome(modArray)) maxX = x;
    }
    
    return maxX;
}

int main() {
    // Example input array A
    std::vector<int> A = {1, 2, 3};
    int n = A.size();
    
    // Find the largest x
    int largestX = largestXForPalindrome(A, n);
    
    std::cout << "The largest positive integer x such that P(A, x) forms a palindrome is: "
              << largestX << std::endl;
              
    return 0;
}
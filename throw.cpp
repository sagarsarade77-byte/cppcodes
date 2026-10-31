#include<iostream>
using namespace std;

class invalidmarks
{
public:
    string message;

    invalidmarks(string msg)
    {
        message = msg;
    }
};

int main()
{
    int marks;

    cout << "Enter marks: ";
    cin >> marks;

    try
    {
        if(marks < 0 || marks > 100)
        {
            throw invalidmarks("Invalid marks entered!");
        }

        cout << "Marks = " << marks << endl;
    }
    catch(invalidmarks e)
    {
        cout << e.message << endl;
    }

    return 0;
}
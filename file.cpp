
#include<iostream>
#include<fstream>
using namespace std;

int main()
{
    ofstream obj;

    obj.open("D:\\filedemo\\qwerty.txt");

    obj << "welcome to c++ class";
    obj << "\nThank you";

    obj.close();

    cout << "Completed successfully";

    return 0;
}

#include <iostream>
using namespace std;

class Student
{
public:
    int rollNo;
    string name;

    void setStudentDetails()
    {
        cout << "Enter Roll No: ";
        cin >> rollNo;

        cout << "Enter Name: ";
        cin >> name;
    }

    void displayStudentDetails()
    {
        cout << "\nRoll No: " << rollNo << endl;
        cout << "Name: " << name << endl;
    }
};

class Sport
{
public:
    int sportMarks;

    void setSportMarks()
    {
        cout << "Enter Sport Marks: ";
        cin >> sportMarks;
    }

    void displaySportMarks()
    {
        cout << "Sport Marks: " << sportMarks << endl;
    }
};

class StudentResult : public Student, public Sport
{
public:
    int academicMarks;

    void setAcademicResult()
    {
        cout << "Enter Academic Marks: ";
        cin >> academicMarks;
    }

    void displayResult()
    {
        cout << "\nStudent Result:" << endl;
        displayStudentDetails();
        cout << "Academic Marks: " << academicMarks << endl;
        displaySportMarks();
    }
};

int main()
{
    StudentResult s;

    s.setStudentDetails();
    s.setAcademicResult();
    s.setSportMarks();

    s.displayResult();

    return 0;
}
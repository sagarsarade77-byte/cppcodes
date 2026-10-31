#include<iostream>
using namespace std;

class student
{
    private:
    int rollno;
    string name;

    static int count;

    public:
    student(int r, string n)
    {
        rollno = r;
        name = n;
        count++;
    }

    friend void display(student s);

    static void showcount()
    {
        cout<<"total object created:"<<count<<endl;
    }
};

int student::count = 0;

void display(student s)
{
    cout<<"roll no"<<s.rollno<<endl;
    cout<<"name"<<s.name<<endl;

}
int main(){
    student s1(101,"sagar");
    student s2(102,"akash");
    student s3(103,"aryan");

    cout<<"student 1:"<<endl;
    display(s1);

    cout<<"studnt 2:"<<endl;
    display(s2);

    cout<<"student 3"<<endl;
    display(s3);

    student::showcount();

    return 0;
}
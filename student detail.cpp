#include<iostream>
using namespace std;

class student
{
    private:
    int rollno;
    string name;

    public:
    void accept()
    {
    cout<<"enter rollno: ";
    cin>>rollno;

    cout<<"enter name: ";
    cin>>name;
    }

    void display()
    {
        cout<<"\nstudent details\n";
        cout<<"rollno: "<<rollno<<endl;
        cout<<"name: "<<name<<endl;
    }
};
int main()
{
    student s;

    s.accept();
    s.display();

    return 0;
}
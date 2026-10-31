#include<iostream>
using namespace std;

class student
{
    protected:
    int rollno;
    string name;

    public:
    void getstudent()
    {
        cout<<"enter roll no:";
        cin>>rollno;

        cout<<"enter name:";
        cin>>name;
    }
    void dispalystudent()
    {
        cout<<"roll no"<<rollno<<endl;
        cout<<"name"<<name<<endl;
    }

};
class marks : public student
{
    protected:
    int m1,m2;

    public:
    void getmarks()
    {
        cout<<"enter marks of subject 1";
        cin>>m1;

        cout<<"enter marks of subject 2";
        cin>>m2;
    }
    void displaymarks()
    {
        cout<<"sub 1 marks:"<<m1<<endl;
        cout<<"sub 2 marks:"<<m2<<endl;
    }
};
class result : public marks
{
    private:
    int total;

    public:
    void calculateresult()
    {
        total = m1+m2;;
    }
    void dispalyresult()
    {
        dispalystudent();
        displaymarks();
        cout<<"total marks:"<<total<<endl;
    }
};

int main()
{
    result r;

    r.getstudent();
    r.getmarks();
    r.calculateresult();

    return 0;
}

#include<iostream>
using namespace std;

class invalidpin
{
    public:
    string message;

    invalidpin(string msg)
    {
        message = msg;
    }
};

int main()
{
   int pin;
   
   cout<<"enter atm pin:";
   cin>>pin;

   try
   {
    if(pin<1000 || pin>>9999)
    {
        throw invalidpin("invalid pin entered:");
    }
    
    cout<<"pin is valid:"<<endl;
   }
   catch(invalidpin e)
   {
    cout<<"exception occurance:\n"<<e.message<<endl;
   }

   return 0;
}
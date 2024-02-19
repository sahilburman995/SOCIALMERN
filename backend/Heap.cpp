#include<bits/stdc++.h>
using namespace std;

class Heap{
public:
int arr[100];
int size=0;

void insert( int val){

     size=size+1;
     int index=size;
     arr[index]=val;

     while( index>1){

        int pind=index/2;

        if(arr[pind]<arr[index]){
            swap( arr[pind],arr[index]);
            index=pind;


        }else{
            return;
        }
     }

    
}
    

void dele(){

if( size==0){
    cout<<"nhi hoga"<<endl;
}


arr[1]=arr[size];

size--;


 int i=1;

 while( i<size){
int left=2*i;
int right=2*1 + 1;


if( arr[i]<arr[left ] && size>left){
     swap( arr[i],arr[left]);
     i=left;
}else if (arr[i]<arr[right] && size> right){

     swap(arr[i],arr[right]);
      i=right;

}else{
    return;
}
 }

}



void heapify(int arr[],int n, int ind){

int largest = ind;
int left =ind*2;
int right=ind*2+1;

if(left<n && arr[largest] <arr[left]){
    largest=left;
}
if( right <n && arr[right ]>arr [largest]){
    largest=right;
}

if( largest !=ind){
    swap(arr[largest],arr[ind]);
    heapify(arr,n,largest);
}
}
 void heapsort(int arr[],int n){

      int size=n;

      while(size>1){

         swap(arr[size],arr[1]);
         size--;
         heapify(arr,size,1);
      }
     }
 void print(){

        for( int i=1 ;i<=size; i++){
            cout<<arr[i];
        }cout<<endl;
     }


};
int main(){

Heap h;
h.insert(1);
h.insert(2);
h.insert(3);
h.insert(4);
h.insert(5);
h.insert(6);

int arr[5]={3,6,1,8,4};

h.print();
h.heapsort(arr,6);
h.print();
return 0;
}
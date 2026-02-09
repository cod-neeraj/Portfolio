#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if(hand.size()%groupSize) return false;
        unordered_map<int,int> hash;
        for(int i=0;i<hand.size();i++){
            if(hash[hand[i]]){
                hash[hand[i]]++;
            }
            else{
                hash[hand[i]]=1;
            }
        }
        priority_queue<int> pq;
        for(auto t:hash){
            pq.push(t.first);
        }
        int n=groupSize;
        while(!pq.empty()){
            int i=0;
            stack<int> temp;
            temp.push(-1);
            while(!pq.empty() && i<n){
                int element=pq.top();
                pq.pop();
                if(temp.top()!=-1 && temp.top()-1!=element) return false;
                hash[element]--;
                //if(hash[element]>0)
                temp.push(element);
                i++;
            }
            while(temp.top()!=-1){
                int element=temp.top();
                if(hash[element]>0)
                    pq.push(element);
                temp.pop();
            }

        }
        return true;
    }
};

int main() {
    Solution s;
    vector<int> hand = {1, 1, 2, 2, 3, 3};
    int groupSize = 2;

    bool result = s.isNStraightHand(hand, groupSize);
    cout << (result ? "true" : "false") << endl;

    return 0;
}

#pragma once
#include <iostream>
#include <queue>

using namespace std;

class ColorChanger
{
public:
	int executions = 0;
	struct point { int x, y; };
	ColorChanger();
	~ColorChanger();
	void CheckPosition(int colorToChange,int newColor, int matrix[10][10], int x, int y);
	void ColorChange(int** matrix, int x, int y);
	void counter();
};


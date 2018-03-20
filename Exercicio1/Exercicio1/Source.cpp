#include <iostream>
using namespace std;

#include "Timer.h"
#include "BubbleSort.h"
#include "InsertionSort.h"
#include "Fibonacci.h"
#include "ColorChanger.h"

BubbleSort b;
InsertionSort i;
Timer t;
Fibonacci f;
ColorChanger color;

int* CriarVetorInt(int n, int min, int max) {
	int* vector = new int[n];
	for (size_t i = 0; i < n; i++)
	{
		vector[i] = rand() % (max-min) + min;
	}
	return vector;
}

int buscarNum(int n, int *array, int length) {
	for (size_t i = 0; i < length; i++)
	{
		if (array[i] == n)
			return i;
	}
	return -1;
}

void CreateMatrix(int a[10][10]) {
	
	//// declaration
	//int ** a;

	//// allocation
	//a = new int*[rows];
	//for (int i = 0; i < rows; i++)
	//	a[i] = new int[cols];

	//// initialization
	//for (int j = 0; j < rows; j++)
	//	for (int i = 0; i < rows; i++)
	//		a[i][j] = 0;
}

void PrintMatrix(int matrix[10][10]) {
	cout << endl;
	for (size_t i = 0; i < 10; i++) {
		for (size_t j = 0; j < 10; j++) {
			cout << matrix[i][j] << " ";
		}
		cout << endl;
	}
}




void MatrixExercise() {
	int matrix[10][10] = { { 0,0,0,9,8,9,0,9,8,7 },
	{ 0,0,0,9,9,0,0,0,9,8 },
	{ 9,0,0,0,9,0,0,0,9,8 },
	{ 9,0,9,0,0,0,0,9,8,7 },
	{ 9,9,9,0,0,0,9,9,9,8 },
	{ 9,9,9,9,9,0,0,0,9,9 },
	{ 9,0,0,9,9,0,0,0,0,0 },
	{ 9,0,0,0,9,0,0,0,9,0 },
	{ 9,9,0,0,9,9,9,0,0,9 },
	{ 9,9,9,9,8,8,8,9,9,8 } };

	PrintMatrix(matrix);

	color.CheckPosition(0, 5, matrix, 5, 5);

	//cout << matrix[0][4] << " ";
	//cout << matrix[3][0] << " ";

	PrintMatrix(matrix);
}

void GetRandomNum(int* a) {
	int random = rand() % 100 + 0;
	cout << "num: " << random << endl;
	t.start();
	cout << "Pos: " << buscarNum(random, a, 10000) << endl;
	t.finish();
	cout << "Random Time: " << t.getElapsedTimeMs() << endl;
}

void BubbleSort(int* a) {
	t.start();
	b.Sort(a, 10000);
	t.finish();
	cout << "Bubble Time: " << t.getElapsedTimeMs() << endl;
}

void InsertSort(int* a) {
	t.start();
	i.Sort(a, 10000);
	t.finish();
	cout << "Insert Time: " << t.getElapsedTimeMs() << endl;
}

void Fibonacci() {
	t.start();
	f.fibo(15);
	t.finish();
	cout << "Fibo Time: " << t.getElapsedTimeMs() << endl;
}

void main() {
	//srand(time(NULL));
	//int* a = CriarVetorInt(10000, 0, 100);

	//GetRandomNum(a);
	//
	//a = CriarVetorInt(10000, 0, 100);
	//BubbleSort(a);
	//
	//a = CriarVetorInt(10000, 0, 100);
	//InsertSort(a);
	//
	//Fibonacci();

	t.start();
	MatrixExercise();
	t.finish();
	cout << "Matrix Time: " << t.getElapsedTimeMs() << endl;
	cout << color.executions << endl;
	system("pause");
}
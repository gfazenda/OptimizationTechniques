#include "ColorChanger.h"



ColorChanger::ColorChanger()
{
}


ColorChanger::~ColorChanger()
{
}


//void ColorChanger::CheckPosition(int colorToChange, int newColor, int matrix[10][10], int x, int y) {
//	counter();
//	if ((x >= 0 && x < 10 && y >= 0 && y < 10) && (matrix[y][x] == colorToChange)) {
//			//		cout << "doing " << endl;
//			matrix[y][x] = newColor;
//			CheckPosition(colorToChange, newColor, matrix, x + 1, y);
//			CheckPosition(colorToChange, newColor, matrix, x - 1, y);
//			CheckPosition(colorToChange, newColor, matrix, x, y + 1);
//			CheckPosition(colorToChange, newColor, matrix, x, y - 1);
//		}
//
//}

void ColorChanger::CheckPosition(int colorToChange, int newColor, int matrix[10][10], int x, int y) {
	queue <point> stack;
	point current, newp;
	current.x = x;
	current.y = y;
	stack.push(current);
	int posx, posy, count = 0;
	while (!stack.empty()) {
		current = stack.front();
		posx = current.x;
		posy = current.y;
		if ((posx >= 0 && posx < 10 && posy >= 0 && posy < 10) && (matrix[posy][posx] == colorToChange)) {
			matrix[posy][posx] = newColor;
			newp.x = posx + 1;
			newp.y = posy;
			stack.push(newp);
			newp.x = posx - 1;
			newp.y = posy;
			stack.push(newp);
			newp.x = posx;
			newp.y = posy +1;
			stack.push(newp);
			newp.x = posx;
			newp.y = posy -1;
			stack.push(newp);
			
			//	CheckPosition(colorToChange, newColor, matrix, x + 1, y);
			//	CheckPosition(colorToChange, newColor, matrix, x - 1, y);
			//	CheckPosition(colorToChange, newColor, matrix, x, y + 1);
			//	CheckPosition(colorToChange, newColor, matrix, x, y - 1);
		}
		stack.pop();
		executions++;
	}
	
}


void ColorChanger::counter(){
	executions++;
}

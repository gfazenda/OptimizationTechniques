using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public static class ExtensionMethods{

	public static T Last<T>(this List<T> list)
    {
        return list[list.Count - 1];
    }

    public static T SecondToLast<T>(this List<T> list)
    {
        if(list.Count >= 2)
            return list[list.Count - 2];
        return default(T);
    }

    public static void Swap<T>(this List<T> list, int a, int b)
    {
        T c = list[a];
        list[a] = list[b];
        list[b] = c;
    }

    public static void Pop<T>(this List<T> list)
    {
        list.RemoveAt(list.Count - 1);
      //  return list[list.Count - 2];
        
    }


}

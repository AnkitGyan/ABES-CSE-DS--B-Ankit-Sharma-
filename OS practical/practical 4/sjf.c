#include <stdio.h>

int main() {
    int A[100][6]; 

    int n, time = 0, completed = 0;
    float total_wt = 0, total_tat = 0;
    int visited[100] = {0};
    int i, min_index;

    printf("Enter number of processes: ");
    scanf("%d", &n);

    for (i = 0; i < n; i++) {
        A[i][0] = i + 1;
        printf("Enter Arrival Time and Burst Time for P%d: ", i + 1);
        scanf("%d%d", &A[i][1], &A[i][2]);
    }

    printf("\nProcess\tAT\tBT\tCT\tTAT\tWT\n");

    while (completed < n) {
        min_index = -1;
        int min_bt = 1e9;

        for (i = 0; i < n; i++) {
            if (!visited[i] && A[i][1] <= time && A[i][2] < min_bt) {
                min_bt = A[i][2];
                min_index = i;
            }
        }

        if (min_index == -1) {
            time++;
        } else {
            time += A[min_index][2];
            A[min_index][3] = time;                                // CT
            A[min_index][4] = A[min_index][3] - A[min_index][1];   // TAT = CT - AT
            A[min_index][5] = A[min_index][4] - A[min_index][2];   // WT = TAT - BT

            total_tat += A[min_index][4];
            total_wt += A[min_index][5];

            visited[min_index] = 1;
            completed++;

            printf("P%d\t%d\t%d\t%d\t%d\t%d\n",
                A[min_index][0],
                A[min_index][1],
                A[min_index][2],
                A[min_index][3],
                A[min_index][4],
                A[min_index][5]);
        }
    }

    printf("\nAverage Turnaround Time = %.2f", total_tat / n);
    printf("\nAverage Waiting Time = %.2f\n", total_wt / n);

    return 0;
}

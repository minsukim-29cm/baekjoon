/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
const canFinish = (numCourses, prerequisites) => {
    const inDegree = new Array(numCourses).fill(0);
    const adj = Array.from({ length: numCourses }, () => []);

    // 1. 그래프 구축 및 진입 차수 계산
    for (const [course, pre] of prerequisites) {
        adj[pre].push(course);
        inDegree[course]++;
    }

    // 2. 진입 차수가 0인(선수 과목이 없는) 과목들을 큐에 삽입
    const queue = [];
    inDegree.forEach((degree, i) => {
        if (degree === 0) queue.push(i);
    });

    let count = 0;

    // 3. BFS 탐색
    while (queue.length) {
        const cur = queue.shift();
        count++;

        for (const next of adj[cur]) {
            inDegree[next]--; // 선수 과목을 이수했으므로 차수 감소
            
            // 모든 선수 과목이 해결되면 큐에 삽입
            if (inDegree[next] === 0) {
                queue.push(next);
            }
        }
    }

    // 이수한 과목 수가 전체 과목 수와 같다면 사이클이 없는 것임
    return count === numCourses;
};
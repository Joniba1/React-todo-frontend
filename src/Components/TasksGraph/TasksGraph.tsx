// Libraries
import { useState, useEffect } from 'react';

// Components
import './TasksGraph.scss';
import { Task, Day } from '../../types';
import useTodoTasks from '../Tasks/TodoTasks/UseTodoTasks';
import DayBar from './Day/DayBar';

const getCurrentMonth = () => new Date().toISOString().slice(0, 7);

const daysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
};

const empty: Task[] = [];

const TasksGraph = () => {
    const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonth());
    const { todoTasks } = useTodoTasks(empty);
    const [totalTasksCount, setTotalTasksCount] = useState<number>(todoTasks.length);
    const [days, setDays] = useState<Day[]>([]);


    useEffect(() => {
        setTotalTasksCount(todoTasks.filter(task => task.deadline).length);
    }, [todoTasks]);

    const updateGraph = (year: number, month: number) => {
        const totalDays = daysInMonth(year, month);
        const data: Day[] = [];

        for (let day = 1; day <= totalDays; day++) {
            const tasksInDayCount = todoTasks.filter(task => {
                const taskDate = new Date(task.deadline);
                return (
                    taskDate.getFullYear() === year &&
                    taskDate.getMonth() + 1 === month &&
                    taskDate.getDate() === day
                );
            }).length;

            data.push({ day: day, tasksInDayCount: tasksInDayCount });
        }
        setDays(data);
    };

    const [year, month] = selectedMonth.split('-').map(Number);

    useEffect(() => {
        updateGraph(year, month);
    }, [selectedMonth, todoTasks]);

    return (
        <>
            <div className="graph-container">
                <div className='icon-labels'>
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </div>

                <div className="graph">
                    <div className='days-container'>

                        <hr />
                        <hr className='gridline-1' />
                        <hr className='gridline-2' />

                        {days.map(({ day, tasksInDayCount }) => {

                            todoTasks.find((task) => {
                                const taskDate = new Date(task.deadline);
                                return (
                                    taskDate.getFullYear() === new Date(selectedMonth).getFullYear() &&
                                    taskDate.getMonth() + 1 === new Date(selectedMonth).getMonth() + 1 &&
                                    taskDate.getDate() === day
                                );
                            });

                            const maxHeight = 4.5;
                            const barHeight = tasksInDayCount > 0 ? `${(tasksInDayCount / totalTasksCount) * maxHeight}em` : '0%';

                            return (
                                <DayBar key={day} day={day} barHeight={barHeight} />
                            );

                            // return (
                            //     <div key={day} className="day">
                            //         <div
                            //             className='bar'
                            //             style={{ height: barHeight }}
                            //         ></div>

                            //         <div className="day-number">{day}</div>
                            //     </div>
                            // );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default TasksGraph;
import { Doughnut } from "react-chartjs-2";

function AttendenceChart({ className, values = [90, 10] }) {
  const data = (canvas) => {
    return {
      labels: ["Present", "Absent"],
      datasets: [
        {
          backgroundColor: ["#3cba9f", "#f11"],
          borderColor: ["#3cba9f", "#f11"],
          data: values,
        },
      ],
    };
  };

  return (
    <div className={className}>
      <Doughnut data={data} height={400} />
    </div>
  );
}

export default AttendenceChart;

import { Line } from "react-chartjs-2";

function ResultsChart({ className, values, labels }) {
  const data = (canvas) => {
    return {
      labels,
      datasets: [
        {
          label: "Marks: ",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
          ],
          borderColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: values,
        },
      ],
    };
  };

  return (
    <div className={className}>
      <Line data={data} />
    </div>
  );
}

export default ResultsChart;

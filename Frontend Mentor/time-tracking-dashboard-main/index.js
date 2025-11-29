document.addEventListener("DOMContentLoaded", () => {
  const periodBtns = document.querySelectorAll("button[data-period]");

  let actualData = null;

  /* ==== Fetch Data ==== */
  const fetchData = async (dataSource) => {
    try {
      const response = await fetch(dataSource);

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed fetch:", error);
      return false;
    }
  };

  /* ==== Returns a object of title, current and previous from json data ==== */
  const getPeriodData = (data, period) => {
    const transformedData = data
      .map((activity) => {
        const title = activity.title;
        const timeData = activity.timeframes[period];

        if (!timeData) {
          console.error(`Data for period: ${period} not found in ${title}`);
          return null;
        }

        return {
          title: title,
          current: timeData.current,
          previous: timeData.previous,
        };
      })
      .filter((item) => item != null);

    return transformedData;
  };

  /* ==== Creating a pipeline to ensure async functionality ==== */
  const initializePipeline = async () => {
    const data = await fetchData("/data.json");

    if (data) {
      actualData = data;
      console.log("Data loaded succesfully.");

      const weeklyData = getPeriodData(actualData, "yearly");
      console.log(weeklyData);
      //   renderData(actualData, "weekly");
      //   attachEventListeners();
    } else {
      console.error("Pipeline initialization failed.");
    }
  };

  // Start the pipeline
  initializePipeline();
});

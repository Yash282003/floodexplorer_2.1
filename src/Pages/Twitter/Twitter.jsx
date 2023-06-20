import React from "react";
import { useState, useContext } from "react";
import TweetChart from "../../components/TweetChart/TweetChart";
import "./Twitter.css";
import { BsTwitter } from "react-icons/bs";
import { IoCaretDownSharp } from "react-icons/io5";
import Spinner from "react-bootstrap/Spinner";
import { saveAs } from "file-saver";

const Twitter = () => {
  const [twitsdata, setTwitsData] = useState([]);
  const [showData, setShowData] = useState([]);      //tweets data
  const [loading, setLoading] = useState(true);
  const [plot, setPlot] = useState(false);
  const [openPanel, setopenPanel] = useState(false);
  const [select, setSelect] = useState("Countries");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const handleStartDateChange = (date) => {
    setStartDate(date.target.value);
    convertToDateGoing(date.target.value);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.target.value);
  };
  const handleDownload = () => {
    if (showData.length === 0) {
      console.log("No data available to download");
      return;
    }
    // Convert showData to CSV format
    const csvData = convertToCSV(showData);

    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    // Use file-saver library to trigger the download
    saveAs(blob, "twitter_data.csv");
  };

  // Function to convert the showData array to CSV format
  const convertToCSV = (data) => {
    if (!data) return "";
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data.map((item) => Object.values(item).join(",")).join("\n");
    return headers + rows;
  };
  const Option = [
    "India",
    "Bangladesh",
    "Nepal",
    "Indonesia",
    "Japan ",
    "Cambodia",
    "Phillipines",
    "Malaysia",
    "Myanmar",
    "Srilanka",
    "Thailand",
    "Vietnam",
    "Laos",
  ];
  async function fetchTwits() {
    setIsLoading(true);
    const twits = await fetch(
      `${process.env.REACT_APP_BASE_URL}/tweets?sDate=${convertToDateGoing(
        startDate
      )}&eDate=${convertToDateGoing(endDate)}`
    );
    const rep = await twits.json();
    console.log(rep);
    if (rep && rep.length > 0) {
      setShowData(rep);
      setTwitsData(countTweetsByDate(rep));
    } else {
      setShowData([]);
      setTwitsData({});
      console.log(rep);
    }
    setIsLoading(false);
    setIsDisabled(false);
  }
  function convertToDateGoing(dateString) {
    var parts2 = dateString.split("-");
    var day2 = parts2[2];
    var month2 = parts2[1];
    var year2 = parts2[0];
    var dateObj2 = month2 + "-" + day2 + "-" + year2;
    console.log(dateObj2);
    return dateObj2;
  }

  function countTweetsByDate(data) {
    let tweetCounts = {};

    for (let i = 0; i < data.length; i++) {
      let tweet = data[i];
      let date = new Date(tweet.Datetime).toISOString().split("T")[0];

      if (tweetCounts[date]) {
        tweetCounts[date]++;
      } else {
        tweetCounts[date] = 1;
      }
    }

    return tweetCounts;
  }

  return (
    <>
      <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand" id="#tab" href="#">
              <div
                className="icon"
                style={{ display: "flex", alignItems: "center" }}
              >
                <BsTwitter />
                <span>Twitter</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="form-title text-center">
          <h2 class="heading">Search Flood Data On Twitter</h2>
          <span class="text">Use the below form to search tweets</span>
        </div>

        <div class="new_flood">
          <div className="form-container">
            <div class="form-group">
              <label for="start-date" class="text-head">
                Flood Start Date:
              </label>
              <br />
              <input
                type="date"
                name="StartDate"
                id="twitstartdate"
                required
                onChange={(e) => handleStartDateChange(e)}
              />
            </div>
            <div class="form-group">
              <label for="end-date" class="text-head">
                Flood End Date:
              </label>
              <br />
              <input
                type="date"
                id="twitenddate"
                name="EndDate"
                required
                onChange={(e) => handleEndDateChange(e)}
              />
            </div>
            <div class="form-group">
              <div className="dropdown">
                <div
                  className="dropdown-btn"
                  onClick={(e) => setopenPanel(!openPanel)}
                >
                  {select}
                  <span>
                    <IoCaretDownSharp style={{ color: "black" }} />
                  </span>
                </div>
                {openPanel && (
                  <div className="dropdown-content">
                    {Option.map((Option) => {
                      return (
                        <div
                          onClick={(e) => {
                            setSelect(Option);
                            setopenPanel(false);
                          }}
                          className="dropdown-item"
                        >
                          {Option}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="download-button-container">
              <button
                onClick={handleDownload}
                className="button"
                disabled={isDisabled}
              >
                Download Data
              </button>
            </div>

            <div class="form-group">
              <button type="submit" onClick={() => fetchTwits()} class="button">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="graph"
        style={{
          width: "60vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
          height: "40vh",
        }}
      >
        <TweetChart tweetCounts={twitsdata} />
      </div>
      {isLoading ? (
        <div
          className="spinner-container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" />
        </div>
      ) : (
        <div
          id="tweet-table"
          style={{
            width: "80vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <main id="site-main">
            <div class="container">
              <table class="table twittable">
                <thead class="thead-dark">
                  <tr>
                    <th>S.N.</th>
                    <th>StartDate</th>
                    <th>Country</th>
                    <th>Tweet</th>
                  </tr>
                </thead>
                <tbody id="twitsbody">
                  {showData?.map((e, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{e.Datetime}</td>
                        <td>India</td>
                        <td>
                          <a
                            href={`https://twitter.com/anyuser/status/${e["Tweet Id"]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {`https://twitter.com/anyuser/status/${e["Tweet Id"]}`}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default Twitter;

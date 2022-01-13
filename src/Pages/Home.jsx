import React, { useEffect, useState } from "react";
import Axios from "../Axios";
import ReactPaginate from "react-paginate";
import "./Home.css";

const Home = () => {
  let [state, setState] = useState([]);
  let [loading, setLoading] = useState(false);
  let [pageNumber, setPageNumber] = useState(0);
  let userPerPage = 10;
  let pageVisited = pageNumber * userPerPage;

  let displayUser = state
    .slice(pageVisited, pageVisited + userPerPage)
    .map(x => (
      <tr key={x.id} className="bodyrow">
        <td>{x.id}</td>
        <td>{x.title}</td>
        <td>{x.completed ? "true" : "false"}</td>
      </tr>
    ));
  useEffect(() => {
    let fetchData = async () => {
      let { data } = await Axios.get("todos");
      //   console.log(data);
      //   setState(data);
      try {
        setLoading(true);
        setState(data);
      } catch (error) {
        console.log(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  let pageCount = Math.ceil(state.length / userPerPage);

  let changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <section>
      {loading === true ? (
        "loading...."
      ) : (
        <table>
          <thead>
            <tr className="headRow">
              <th>id</th>
              <th>title</th>
              <th>completed</th>
            </tr>
          </thead>

          <tbody>{displayUser}</tbody>
        </table>
      )}
      <section className="paginationBlock">
        <ReactPaginate
          previousLable={"Previous"}
          nextLable={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClass={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disableClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </section>
    </section>
  );
};

export default Home;

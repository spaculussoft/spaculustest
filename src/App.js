import "./App.css";
import { useState } from "react";
import { defaultProvider, mailgun, postmask } from "./config/config";
import axios from "axios";

function App() {
  const [to, setTo] = useState("");
  const [toName, setToName] = useState("");
  const [from, setFrom] = useState("");
  const [fromName, setFromName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [defaultService, setDefaultService] = useState(defaultProvider);
  const [toError, setToError] = useState("");
  const [toNameError, setToNameError] = useState("");
  const [fromError, setFromError] = useState("");
  const [fromNameError, setFromNameError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [bodyError, setBodyError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (to.trim().length === 0) {
      console.log("Please enter to email address");
      setToError("Please enter to email address");
    } else if (!validRegex.test(to)) {
      console.log("Valid to email address");
      setToError("Please enter valid to email address");
    } else {
      setToError("");
    }

    if (from.trim().length === 0) {
      console.log("Please enter from email address");
      setFromError("Please enter from email address");
    } else if (!validRegex.test(from)) {
      console.log("Valid from email address");
      setFromError("Please enter valid from email address");
    } else {
      setFromError("");
    }

    if (toName.trim().length === 0) {
      console.log("Please enter to name for email address");
      setToNameError("Please enter to name for email address");
    } else {
      setToNameError("");
    }

    if (fromName.trim().length === 0) {
      console.log("Please enter from name for email address");
      setFromNameError("Please enter from name for email address");
    } else {
      setFromNameError("");
    }

    if (subject.trim().length === 0) {
      console.log("Please enter subject for email address");
      setSubjectError("Please enter subject for email address");
    } else {
      setSubjectError("");
    }

    if (body.trim().length === 0) {
      console.log("Please enter body for email address");
      setBodyError("Please enter body for email address");
    } else {
      setBodyError("");
    }

    if (
      toError.length === 0 &&
      toNameError.length === 0 &&
      fromError.length === 0 &&
      fromNameError.length === 0 &&
      subjectError.length === 0 &&
      bodyError.length === 0
    ) {
      console.log(to, toName, from, fromName, subject, body, defaultService);

      if (defaultService.toString() == "mailgun") {
        var formdata = new FormData();
        formdata.append("to", toName + " <" + to + ">");
        formdata.append("from", fromName + " <" + from + ">");
        formdata.append("subject", subject);
        formdata.append("html", body.trim());

        let url = "https://api.mailgun.net/v3/" + mailgun.domain + "/messages";
        axios
          .post(url, formdata, {
            withCredentials: false,
            headers: {
              Authorization:
                "Basic " + btoa(mailgun.username + ":" + mailgun.password),
            },
          })
          .then(function (response) {
            alert("Email sent successfully");
            setTo("");
            setToName("");
            setFrom("");
            setFromName("");
            setSubject("");
            setBody("");
          })

          .catch(function (error) {
            console.log(error);
          });
      } else {
        let data = JSON.stringify({
          to: toName + " <" + to + ">",
          from: fromName + " <" + from + ">",
          subject: subject,
          html: body.trim(),
        });
        console.log(data);
        let url = "https://api.postmarkapp.com/email";
        axios
          .post(url, data, {
            headers: {
              "content-type": "application/json",
              Accept: "application/json",
              "X-Postmark-Server-Token": postmask.token,
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(function (response) {
            alert("Email sent successfully");
            setTo("");
            setToName("");
            setFrom("");
            setFromName("");
            setSubject("");
            setBody("");
          })

          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const toggleProvider = () => {
    if (defaultService.toString() == "mailgun") {
      setDefaultService("postmask");
    } else {
      setDefaultService("mailgun");
    }
  };

  return (
    <div className="p-2">
      <div className="d-block">
        <button
          type="button"
          className="btn btn-primary mb-5 mt-2 float-end"
          onClick={toggleProvider}
        >
          Toggle Email Provider
        </button>
        <div className="card mt-2 p-2 w-50 m-auto">
          <h1>Send Email</h1>

          <div className="mb-3">
            <label htmlFor="to" className="form-label">
              TO
            </label>
            <input
              type="email"
              className="form-control"
              id="to"
              onChange={(e) => setTo(e.target.value)}
            />
            {toError.length > 0 && (
              <div className="alert alert-danger  mt-1 py-0" role="alert">
                {toError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="to" className="form-label">
              TO NAME
            </label>
            <input
              type="text"
              className="form-control"
              id="to_name"
              onChange={(e) => setToName(e.target.value)}
            />
            {toNameError.length > 0 && (
              <div className="alert alert-danger  mt-1 py-0" role="alert">
                {toNameError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="to" className="form-label">
              FROM
            </label>
            <input
              type="email"
              className="form-control"
              id="from"
              onChange={(e) => setFrom(e.target.value)}
            />
            {fromError.length > 0 && (
              <div className="alert alert-danger  mt-1 py-0" role="alert">
                {fromError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="to" className="form-label">
              FROM NAME
            </label>
            <input
              type="text"
              className="form-control"
              id="from_name"
              onChange={(e) => setFromName(e.target.value)}
            />
            {fromNameError.length > 0 && (
              <div className="alert alert-danger  mt-1 py-0" role="alert">
                {fromNameError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="to" className="form-label">
              SUBJECT
            </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              onChange={(e) => setSubject(e.target.value)}
            />
            {subjectError.length > 0 && (
              <div className="alert alert-danger  mt-1 py-0" role="alert">
                {subjectError}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="to" className="form-label">
              BODY
            </label>
            <textarea
              type="text"
              className="form-control"
              id="body"
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            {bodyError.length > 0 && (
              <div className="alert alert-danger  mt-1 py-0" role="alert">
                {bodyError}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

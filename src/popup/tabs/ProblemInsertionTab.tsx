import React, { FC, Fragment, useEffect, useState } from "react";
import { Problem } from "../../common/class";
import { SiteType } from "../../common/enum";

const parseProblemInfo = (setProblemInfo: CallableFunction) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { from: "popup", subject: "ProblemInfo" }, (response) => {
      setProblemInfo(response);
    });
  });
};

const submit = (problem: Problem) => {
  alert(JSON.stringify(problem));
};

const ProblemInsertionTab: FC<{}> = () => {
  const [problemInfo, setProblemInfo] = useState<Problem>({
    site: SiteType.DEFAULT,
    number: "DEFAULT_NUMBER",
    title: "DEFAULT_TITLE",
    url: "DEFAULT_URL",
  });

  useEffect(() => {
    parseProblemInfo(setProblemInfo);
  }, []);

  return (
    <Fragment>
      <h3>다시풀기에 문제 추가하기</h3>
      <div>
        <div>
          <span id="site">{problemInfo.site}</span>
        </div>
        <div>
          <span id="number">{problemInfo.number}</span>
        </div>
        <div>
          <span id="title">{problemInfo.title}</span>
        </div>
        <div>
          <span id="url">{problemInfo.url}</span>
        </div>
      </div>
      <button id="submit-btn" onClick={() => submit(problemInfo)}>
        저장하기
      </button>
    </Fragment>
  );
};

export default ProblemInsertionTab;

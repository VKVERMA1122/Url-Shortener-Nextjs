import { useState } from "react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const [fullurl, setfullurl] = useState("");
  const [shorturl, setshorturl] = useState("");

  const createUrl = async () => {
    const response = await fetch(
      "https://url-shortener-nextjs-6fvrvvdxt.vercel.app/api/post/url",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fullurl: fullurl,
          shorturl: shorturl,
        }),
      }
    );

    console.log(response);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Input
        value={fullurl}
        mb="10px"
        width="10rem"
        errorBorderColor="crimson"
        isInvalid={!fullurl}
        onChange={(e) => setfullurl(e.target.value)}
        placeholder="Enter Full Url"
      />
      <Input
        value={shorturl}
        mb="10px"
        width="10rem"
        errorBorderColor="crimson"
        isInvalid={!shorturl}
        onChange={(e) => setshorturl(e.target.value)}
        placeholder="Enter Short Form"
      />
      <Button onClick={createUrl} isDisabled={!fullurl | !shorturl} mt="10px">
        Submit
      </Button>
    </div>
  );
}

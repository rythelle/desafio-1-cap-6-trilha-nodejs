import { document } from "../utils/dynamodbClient";

interface ICreateToDo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

export const handle = async (event) => {
  const { user_id } = JSON.parse(event.params) as ICreateToDo;

  const { title, deadline } = JSON.parse(event.body) as ICreateToDo;

  await document
    .put({
      TableName: "to_do",
      Item: {
        id,
        title,
        deadline,
      },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Task created",
    }),
    headers: {
      "Content-type": "application/json",
    },
  };
};

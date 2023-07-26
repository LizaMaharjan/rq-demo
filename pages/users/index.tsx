import { getUserList, postUser } from "@/services/users";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";

const Users = () => {
  const [addOpen, setAddOpen] = useState(false);
  const { data: userList, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUserList,
  });

  const { mutate, isLoading: postLoading } = useMutation({
    mutationFn: (values) => postUser({ payload: values }),
    onSuccess(data) {
      setAddOpen(false);
      message.success(`${data?.name} added successfully !!`);
    },
  });

  const handleFinish = (values: any) => {
    mutate(values);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-20 bg-white">
      <div className="grid gap-8 grid-cols-5 mb-20">
        {userList
          ? userList?.map((user: any) => (
              <div key={user.id} className="text-black">
                <p>Name: {user.name}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
              </div>
            ))
          : ""}
      </div>
      {addOpen && (
        <Form
          className="max-w-[500px]"
          layout="vertical"
          onFinish={handleFinish}
          disabled={postLoading}
        >
          <Form.Item name="name" label="Name">
            <Input type="text" placeholder="Enter name" />
          </Form.Item>
          <Form.Item name="username" label="Username">
            <Input type="text" placeholder="Enter username" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input type="email" placeholder="Enter email" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" disabled={postLoading}>
              {postLoading ? "Submitting.." : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      )}
      <button
        onClick={() => setAddOpen(!addOpen)}
        className="px-5 py-3  bg-black text-white rounded-lg"
      >
        {addOpen ? "Cancel" : "Add"}
      </button>
    </div>
  );
};

export default Users;

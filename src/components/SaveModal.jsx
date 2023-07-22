import { useDispatch, useSelector } from "react-redux";
import {
  getSaveModal,
  saveModalClosed,
  savedQuery,
} from "../redux/saved/savedSlice";
import { Input, Modal, Form } from "antd";

const SaveModal = () => {
  const dispatch = useDispatch();
  const saveModal = useSelector(getSaveModal);
  const [form] = Form.useForm();
  const cancel = () => {
    form.resetFields();
    dispatch(saveModalClosed());
  };
  const saveQuery = ({ title }) => {
    dispatch(savedQuery({ ...saveModal, title }));
    cancel();
  };

  const submitForm = () => {
    form.submit();
  };

  return (
    <Modal
      title="Save query"
      open={!!saveModal}
      onOk={submitForm}
      okText="Save"
      onCancel={cancel}
    >
      <Form form={form} onFinish={saveQuery}>
        <p
          style={{ background: "#f3f3f3", borderRadius: "8px", padding: "8px" }}
        >
          {saveModal?.query}
        </p>
        <Form.Item
          name="title"
          label="Enter Query name"
          rules={[
            {
              required: true,
              message: "please enter a name!",
            },
          ]}
        >
          <Input placeholder="My fav query" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default SaveModal;

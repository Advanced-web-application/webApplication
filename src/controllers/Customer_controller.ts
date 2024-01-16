import CustomerModel, { ICustomer } from "../models/Customer_model";
import createController from "./base_controller";

const CustomerController = createController<ICustomer>(CustomerModel);

export default CustomerController

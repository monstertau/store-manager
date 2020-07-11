import React from "react";
import "./invoice.css";
import { billService } from "../../_services/bill.service";
import { numberWithCommas } from "../../_utils";
class InvoicePrint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
    };
  }
  componentDidMount() {
    const pathName = window.location.pathname.split("/");
    const id = pathName[2];
    console.log(id);
    billService.getSellInfo(id).then((data) => {
      this.setState({
        data: data,
      });
    });
  }
  render() {
    return (
      <div>
        {this.state.data ? (
          <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
              <tr class="top">
                <td colspan="2">
                  <table>
                    <tr>
                      <td class="title">
                        <img
                          src="https://cdn.get.store/images/share-logo.jpg"
                          // style="width: 100%; max-width: 300px;"
                          style={{ width: "100%", maxWidth: "300px" }}
                        />
                      </td>

                      <td>
                        Invoice #: {this.state.data.id}
                        <br />
                        Created: {this.state.data.createdAt}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="information">
                <td colspan="2">
                  <table>
                    <tr>
                      <td>
                        Store Manager, Inc.
                        <br />
                        1 Dai Co Viet Road, Hai Ba Trung, Ha Noi
                        <br />
                        Dai Hoc Bach Khoa Ha Noi
                      </td>

                      <td>
                        BK Corp.
                        <br />
                        Cashier: {this.state.data.user_name}
                        <br />
                        Cashier ID: {this.state.data.user_id}
                        <br />
                        Customer:{" "}
                        {this.state.data.customer_name ? (
                          <>{this.state.data.customer_name}</>
                        ) : (
                          "New Customer"
                        )}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr class="heading">
                <td>Payment Method</td>

                <td>Type #</td>
              </tr>

              <tr class="details">
                <td>Cash</td>

                <td>VND</td>
              </tr>

              <tr class="heading">
                <td>Item</td>

                <td>Price</td>
              </tr>
              {this.state.data.sell_items.map((e, i) => (
                <tr class="item">
                  <td>{e.product_name}</td>

                  <td>{numberWithCommas(e.price * e.quantities)} VND</td>
                </tr>
              ))}
              {/* <tr class="item">
                <td>Website design</td>

                <td>$300.00</td>
              </tr>

              <tr class="item">
                <td>Hosting (3 months)</td>

                <td>$75.00</td>
              </tr>

              <tr class="item last">
                <td>Domain name (1 year)</td>

                <td>$10.00</td>
              </tr> */}

              <tr class="total">
                <td></td>

                <td>Total: {numberWithCommas(this.state.data.total)} VND</td>
              </tr>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
export default InvoicePrint;

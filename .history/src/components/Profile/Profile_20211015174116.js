import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import "./style.css";
import { useParams } from "react-router-dom";
import UserService from "../../services/user.service";

function Profile(props) {
  // const item = props.location.state.user || {};
  const [user, setUser] = useState({
    username: "",
    age: "",
  });

  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    UserService.getUser(id).then(
      (response) => {
        setUser(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setUser(_content);
      }
    );
  }, []);

  return (
    <div>
      <section class="my-5">
        <div class="container">
          <div class="bg-white shadow rounded-lg d-block d-sm-flex">
            <div class="profile-tab-nav border-right">
              <div class="p-4">
                <div class="img-circle text-center mb-3">
                  <img src={user.avatar} alt="Image" class="shadow" />
                </div>
                <h4 class="text-center">{user.username}</h4>
                <h6 class="text-center">
                  <i>{user.age} ages</i>
                </h6>
              </div>
              <div
                class="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  class="nav-link active"
                  id="account-tab"
                  data-toggle="pill"
                  href="#account"
                  role="tab"
                  aria-controls="account"
                  aria-selected="true"
                >
                  <i class="fa fa-home text-center mr-1"></i>
                  Account
                </a>
                {/* <a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
									<i class="fa fa-key text-center mr-1"></i>
							Password
						</a>
								<a class="nav-link" id="security-tab" data-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">
									<i class="fa fa-user text-center mr-1"></i>
							Security
						</a>
								<a class="nav-link" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false">
									<i class="fa fa-tv text-center mr-1"></i>
							Application
						</a>
								<a class="nav-link" id="notification-tab" data-toggle="pill" href="#notification" role="tab" aria-controls="notification" aria-selected="false">
									<i class="fa fa-bell text-center mr-1"></i>
							Notification
						</a> */}
              </div>
            </div>
            <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="account"
                role="tabpanel"
                aria-labelledby="account-tab"
              >
                <h3 class="mb-4">Employee Profile</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        class="form-control"
                        value={user.username}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Gender</label>
                      <input
                        type="text"
                        class="form-control"
                        value={user.gender}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="text"
                        class="form-control"
                        value={format(user.dateOfBirth, "yyyy/MM/dd kk:mm:ss")}
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        class="form-control"
                        value="kiranacharya287@gmail.com"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Phone number</label>
                      <input
                        type="text"
                        class="form-control"
                        value="+91 9876543215"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        class="form-control"
                        value="Kiran Workspace"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Designation</label>
                      <input
                        type="text"
                        class="form-control"
                        value="UI Developer"
                      />
                    </div>
                  </div>
                  {/* <div class="col-md-12">
								<div class="form-group">
								  	<label>Bio</label>
									<textarea class="form-control" rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!</textarea>
								</div>
							</div> */}
                </div>
                <div>
                  <button class="btn btn-primary">Update</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="password"
                role="tabpanel"
                aria-labelledby="password-tab"
              >
                <h3 class="mb-4">Password Settings</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Old password</label>
                      <input type="password" class="form-control" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>New password</label>
                      <input type="password" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Confirm new password</label>
                      <input type="password" class="form-control" />
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary">Update</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="security"
                role="tabpanel"
                aria-labelledby="security-tab"
              >
                <h3 class="mb-4">Security Settings</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Login</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Two-factor auth</label>
                      <input type="text" class="form-control" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="recovery"
                        />
                        <label class="form-check-label" for="recovery">
                          Recovery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary">Update</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="application"
                role="tabpanel"
                aria-labelledby="application-tab"
              >
                <h3 class="mb-4">Application Settings</h3>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="app-check"
                        />
                        <label class="form-check-label" for="app-check">
                          App check
                        </label>
                      </div>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          value=""
                          id="defaultCheck2"
                        />
                        <label class="form-check-label" for="defaultCheck2">
                          Lorem ipsum dolor sit.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary">Update</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="notification"
                role="tabpanel"
                aria-labelledby="notification-tab"
              >
                <h3 class="mb-4">Notification Settings</h3>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="notification1"
                    />
                    <label class="form-check-label" for="notification1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorum accusantium accusamus, neque cupiditate quis
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="notification2"
                    />
                    <label class="form-check-label" for="notification2">
                      hic nesciunt repellat perferendis voluptatum totam porro
                      eligendi.
                    </label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="notification3"
                    />
                    <label class="form-check-label" for="notification3">
                      commodi fugiat molestiae tempora corporis. Sed dignissimos
                      suscipit
                    </label>
                  </div>
                </div>
                <div>
                  <button class="btn btn-primary">Update</button>
                  <button class="btn btn-light">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
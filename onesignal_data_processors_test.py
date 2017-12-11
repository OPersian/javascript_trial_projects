"""
OneSignal data processors tests.
"""

from django.test.client import RequestFactory
from mock import mock
from ddt import ddt, data, unpack

from web.apiv1.view.viewutil import COOKIE_SID
from web.apiv2.test.apiv2 import APIv2UserTest
from web.apiv2.view.onesignal_data_processors import ProcessOneSignalData


@ddt
class OneSignalDataProcessorsTest(APIv2UserTest):
    """
    Test OneSignal data processing flow.

    Test params for OneSignal players ids storage
    and OneSignal tags sending.
    """
    def test_api_message(self):
        """
        Test a message of OneSignal data processing API endpoint.
        """
        self.loginUser()
        post_data = {
            "userId": "123abc",
            "sendUserTags": True,
        }
        response = self.post("/v2/onesignal/process_data/", data=post_data)
        self.assertIn("player ids (if stored in MongoDB)", response.data["message"])
        self.assertEqual(response.status_code, 200)

    @data(
        # Case with required params only
        ({
             "userId": "123abc",
             "sendUserTags": True
         }, {
            "player_id": u"123abc",
            "send_empty_tags": False,
            "send_user_tags": True,
            "store_player": None,
            "update_current_player": True,
        }),
        # Case with arbitrary optional params
        ({
            "userId": "123abc",
            "sendUserTags": True,
            "storePlayer": True,
            "sendEmptyTags": True,
            "updateCurrentPlayer": True,
            "uniqueParam": "123abc",
        }, {
            "player_id": u"123abc",
            "send_empty_tags": True,
            "send_user_tags": True,
            "store_player": True,
            "update_current_player": True,
        }),
    )
    @mock.patch('web.apiv2.view.onesignal_data_processors.process_onesignal_data')
    @unpack
    def test_api_parameters(self, post_data, processing_params, process_onesignal_data):
        """
        Test params of OneSignal data processing API endpoint.
        """
        self.loginUser()

        # rf = RequestFactory()
        # request = rf.post("/v2/onesignal/process_data/", data=post_data)
        # request.COOKIES[COOKIE_SID] = self.user_wrapper.sid
        #
        # processing_view = ProcessOneSignalData.as_view()
        # processing_view.user_wrapper = self.user_wrapper
        #
        # response = processing_view(request)

        response = self.post("/v2/onesignal/process_data/", data=post_data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(process_onesignal_data.call_count, 1)

        args, kwargs = process_onesignal_data.call_args
        self.assertEqual(kwargs["user_wrapper"].data, self.user_wrapper.data)
        for key in processing_params.keys():
            self.assertEqual(kwargs[key], processing_params[key])

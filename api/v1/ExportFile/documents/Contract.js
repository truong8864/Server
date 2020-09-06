module.exports = ({
  ProfileName,
  Gender,
  DateOfBirth,
  PAStreet,
  IDNo,
  IDDateOfIssue,
  IDPlaceOfIssue,
  DateContract,
  ContractNo,CodeEmp
}) => {
  const today = new Date();
  return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      </head>
      <body>
      <p>&nbsp;</p>
      <table style="margin-left: auto; margin-right: auto;" width="687">
      <tbody>
      <tr>
      <td style="width: 288px;">
      <p style="text-align: center;"><strong>C&Ocirc;NG TY</strong><strong> CP QUỐC TẾ PHONG PH&Uacute;</strong></p>
      </td>
      <td style="width: 383px;">
      <p style="text-align: center;"><strong>CỘNG H&Ograve;A X&Atilde; HỘI CHỦ NGHĨA VIỆT NAM<br /> Độc lập &ndash; Tự do &ndash; Hạnh ph&uacute;c</strong></p>
      </td>
      </tr>
      </tbody>
      </table>
      <p>&nbsp;</p>
      <p>&nbsp;</p>
      <h1 style="text-align: center;">HỢP ĐỒNG LAO ĐỘNG</h1>
      <p style="text-align: center;">Số: ${ContractNo}</p>
      <p style="text-align: center;">MSNV: {CodeEmp}</p>
      <p style="text-align: center;">&nbsp;</p>
      <p style="text-align: center;"><em>Căn cứ Bộ luật D&acirc;n sự số 91/2015/QH13 của Quốc hội Nước cộng h&ograve;a X&atilde; hội chủ nghĩa Việt Nam ng&agrave;y 14/11/2015. C&oacute; hiệu lực thi h&agrave;nh kể từ ng&agrave;y 01/01/2017</em></p>
      <p style="text-align: center;"><em>Căn cứ Bộ lu&acirc;t Lao động số 10/2012/QH13, ng&agrave;y 18/06/2012 của Nước Cộng h&ograve;a X&atilde; hội Chủ nghĩa Việt Nam</em></p>
      <p style="text-align: center;"><em>Căn cứ Luật Bảo hiểm X&atilde; hội số 58/2014/QH13, ng&agrave;y 20/11/2014 của Nước Cộng h&ograve;a X&atilde; hội Chủ nghĩa Việt Nam.</em></p>
      <p style="text-align: center;">&nbsp;</p>
      <p>H&ocirc;m nay, ng&agrave;y ${today.getDate()} th&aacute;ng ${
    today.getMonth() + 1
  } năm ${today.getFullYear()} tại <strong>C&ocirc;ng Ty Cổ Phần Quốc Tế Phong Ph&uacute;</strong> ch&uacute;ng t&ocirc;i gồm:</p>
      <p><strong>B&Ecirc;N A: C&Ocirc;NG TY CP QUỐC TẾ PHONG PH&Uacute;</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <p><em>Địa chỉ</em>: 48, Tăng Nhơn Ph&uacute;, Tăng Nhơn Ph&uacute; B, Quận 9, Tp. Hồ Ch&iacute; Minh</p>
      <p><em>Đại diện:</em> &Ocirc;ng/b&agrave;:<strong> NGUYỄN THỊ LI&Ecirc;N&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong>Chức vụ: <strong>Ph&oacute; Tổng Gi&aacute;m đốc</strong></p>
      <p><em>Số CMND/ Hộ chiếu: </em>025199248&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>cấp ng&agrave;y: </em>29/09/2009<em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; tại: </em>TP. HCM</p>
      <p><em>Địa chỉ cư tr&uacute;: </em>168/47B V&otilde; Th&agrave;nh Trang, Phường 11, T&acirc;n B&igrave;nh, TP. HCM</p>
      <p><strong>V&agrave;,</strong></p>
      <p><strong>B&Ecirc;N B: &Ocirc;ng/b&agrave;: ${ProfileName}</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>Giới t&iacute;nh</em>: ${Gender}</p>
      <p><em>Ng&agrave;y th&aacute;ng năm sinh</em>: ${DateOfBirth}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
      <p><em>Địa chỉ cư tr&uacute;</em>: ${PAStreet}</p>
      <p><em>Số CMND/Hộ chiếu</em>: ${IDNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>cấp ng&agrave;y</em>: ${IDDateOfIssue}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>tại</em>: ${IDPlaceOfIssue}</p>
      <p><em>Số sổ lao động</em> (nếu c&oacute;): ${ContractNo}</p>
      <p>Thỏa thuận k&yacute; kết hợp đồng lao động v&agrave; cam kết l&agrave;m đ&uacute;ng những điều khoản sau đ&acirc;y:</p>
      <h3>Điều 1: Thời hạn của hợp đồng lao động</h3>
      <ol>
      <li>Loại hợp đồng lao động: Hợp đồng kh&ocirc;ng x&aacute;c định thời hạn</li>
      <li>Từ ng&agrave;y: <strong>${DateContract}</strong></li>
      <li>Chức danh chuy&ecirc;n m&ocirc;n: Nh&acirc;n vi&ecirc;n kiểm so&aacute;t lao động tiền lương&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <em>Chức vụ</em> (nếu c&oacute;):&nbsp; Nh&acirc;n vi&ecirc;n</li>
      </ol>
      <h3>Điều 2: C&ocirc;ng việc v&agrave; địa điểm l&agrave;m việc</h3>
      <ol>
      <li>C&ocirc;ng việc phải l&agrave;m: Lao động - tiền lương v&agrave; c&aacute;c c&ocirc;ng việc kh&aacute;c khi c&oacute; nhu cầu.</li>
      <li>Địa điểm l&agrave;m việc: 48, Tăng Nhơn Ph&uacute;, Tăng Nhơn Ph&uacute; B, Quận 9, Tp. Hồ Ch&iacute; Minh (Khối Văn Ph&ograve;ng - Ph&ograve;ng H&agrave;nh ch&iacute;nh Nh&acirc;n sự)</li>
      <li>Phương tiện đi lại l&agrave;m việc: Tự t&uacute;c</li>
      </ol>
      <h3>Điều 3: Tiền lương, h&igrave;nh thức trả lương</h3>
      <ol>
      <li><strong>Mức lương</strong>:</li>
      <li>Mức lương (bao gồm mức lương cơ bản, phụ cấp nặng nhọc, phụ cấp tay nghề): <strong>000 </strong>đồng.</li>
      <li>Phụ cấp kh&aacute;c: Kh&ocirc;ng c&oacute;</li>
      <li><strong>H&igrave;nh thức trả lương:</strong></li>
      <li>Tiền lương theo thời gian được trả căn cứ v&agrave;o thời gian l&agrave;m việc thực tế trong th&aacute;ng của người lao động, cam kết kh&ocirc;ng trả thấp hơn lương tối thiểu do Ch&iacute;nh phủ quy định.</li>
      <li>Tiền lương theo sản phẩm được trả căn cứ v&agrave;o mức độ ho&agrave;n th&agrave;nh số lượng, chất lượng sản phẩm theo định mức v&agrave; đơn gi&aacute; sản phẩm được giao trong th&aacute;ng, cam kết kh&ocirc;ng trả thấp hơn lương tối thiểu do Ch&iacute;nh phủ quy đinh.</li>
      <li>Tiền lương được trả bằng h&igrave;nh thức: o Tiền mặt &thorn; Chuyển khoản</li>
      </ol>
      <ol>
      <li><strong>Kỳ hạn trả lương</strong> : C&ocirc;ng ty chi trả lương một lần trong th&aacute;ng, v&agrave;o ng&agrave;y 10 h&agrave;ng th&aacute;ng. Trường hợp ng&agrave;y chi trả lương n&oacute;i tr&ecirc;n tr&ugrave;ng v&agrave;o ng&agrave;y nghỉ h&agrave;ng tuần, ng&agrave;y nghỉ lễ th&igrave; được chi trả v&agrave;o ng&agrave;y l&agrave;m việc kế tiếp.&nbsp;</li>
      </ol>
      <h3>Điều 4: Chế độ n&acirc;ng bậc, n&acirc;ng lương</h3>
      <p>Theo quy định trong Thang &ndash; Bảng lương của C&ocirc;ng ty đ&atilde; đăng k&yacute; với Cơ quan Nh&agrave; nước c&oacute; thẩm quyền.</p>
      <p><strong>Điều 5: Thời giờ l&agrave;m việc, thời giờ nghỉ ngơi</strong></p>
      <ul>
      <li><strong>Thời giờ l&agrave;m việc: </strong></li>
      </ul>
      <p>8 giờ/ng&agrave;y, 6 ng&agrave;y/tuần.</p>
      <p>Trong ng&agrave;y l&agrave;m việc Ban L&atilde;nh Đạo của C&ocirc;ng ty sẽ th&ocirc;ng b&aacute;o thay đổi lịch l&agrave;m việc khi xảy ra sự cố bất khả kh&aacute;ng hoặc x&eacute;t thấy cần thiết. C&oacute; trao đổi với đại diện người lao động.</p>
      <ul>
      <li><strong>Thời giờ nghỉ ngơi:</strong></li>
      </ul>
      <p>Trong trường hợp xin nghỉ 01 ng&agrave;y (việc ri&ecirc;ng, kh&ocirc;ng hưởng lương&hellip;) phải b&aacute;o c&ocirc;ng ty trước &iacute;t nhất 01 ng&agrave;y. Nếu nghỉ từ 02 ng&agrave;y trở l&ecirc;n phải th&ocirc;ng b&aacute;o trước &iacute;t nhất 03 ng&agrave;y l&agrave;m việc.</p>
      <p>Ng&agrave;y nghỉ hằng năm, nghỉ lễ, tết theo quy định hiện h&agrave;nh của Bộ luật lao động hoặc theo quy định của C&ocirc;ng ty (sẽ th&ocirc;ng b&aacute;o trước cho người lao động sau khi thống nhất được với Ban chấp h&agrave;nh c&ocirc;ng đo&agrave;n).</p>
      <p><strong>Điều 6: Bảo hiểm x&atilde; hội, bảo hiểm thất nghiệp v&agrave; bảo hiểm y tế</strong></p>
      <p>Người sử dụng lao động v&agrave; người lao động thực hiện theo quy định của ph&aacute;p luật hiện h&agrave;nh.</p>
      <h3>Điều 7: Đ&agrave;o tạo, bồi dưỡng, n&acirc;ng cao tr&igrave;nh độ tay nghề</h3>
      <ul>
      <li>Trước khi nhận việc, người lao động được học tập đầy đủ c&aacute;c quy định về: nội quy lao động; kỷ luật lao động; thỏa ước lao động tập thể, an to&agrave;n lao động. Nếu trực tiếp hoặc li&ecirc;n quan đến sản xuất được học tập nội quy về quy tr&igrave;nh thao t&aacute;c vận h&agrave;nh m&aacute;y m&oacute;c thiết bị&hellip;</li>
      <li>Được đ&agrave;o tạo bổ t&uacute;c tay nghề.</li>
      <li>Được dự c&aacute;c lớp bồi dưỡng ch&iacute;nh trị, nghiệp vụ, chuy&ecirc;n m&ocirc;n ngắn hạn hoặc d&agrave;i hạn theo quy hoạch của C&ocirc;ng ty. Trong thời gian c&ocirc;ng ty cử đi đ&agrave;o tạo, tấp huấn được hưởng 100% lương.</li>
      </ul>
      <h3>Điều 8: Nghĩa vụ v&agrave; quyền lợi của người lao động</h3>
      <p><strong>Quyền lợi: </strong></p>
      <ul>
      <li>Được quyền l&agrave;m việc, học nghề, n&acirc;ng cao tr&igrave;nh độ nghề nghiệp v&agrave; kh&ocirc;ng bị ph&acirc;n biệt đối xử;</li>
      <li>Hưởng lương ph&ugrave; hợp với tr&igrave;nh độ kỹ năng nghề tr&ecirc;n cơ sở thoả thuận với người sử dụng lao động; được bảo hộ lao động, l&agrave;m việc trong điều kiện bảo đảm về an to&agrave;n lao động, vệ sinh lao động; nghỉ theo chế độ, nghỉ hằng năm c&oacute; lương</li>
      <li>Gia nhập, hoạt động c&ocirc;ng đo&agrave;n, tổ chức nghề nghiệp v&agrave; tổ chức kh&aacute;c theo quy định của ph&aacute;p luật; y&ecirc;u cầu v&agrave; tham gia đối thoại với người sử dụng lao động, thực hiện quy chế d&acirc;n chủ v&agrave; được tham vấn tại nơi l&agrave;m việc để bảo vệ quyền v&agrave; lợi &iacute;ch hợp ph&aacute;p của m&igrave;nh; tham gia quản l&yacute; theo nội quy của người sử dụng lao động;</li>
      </ul>
      <h3>-&nbsp;&nbsp;&nbsp;&nbsp; Đơn phương chấm dứt hợp đồng lao động theo quy định của ph&aacute;p luật.</h3>
      <p><strong>Nghĩa vụ:</strong></p>
      <ul>
      <li>Thực hiện hợp đồng lao động, thoả ước lao động tập thể.</li>
      <li>Chấp h&agrave;nh kỷ luật lao động, nội quy lao động, tu&acirc;n theo sự điều h&agrave;nh hợp ph&aacute;p của người sử dụng lao động;</li>
      <li>Thực hiện c&aacute;c quy định của ph&aacute;p luật về bảo hiểm x&atilde; hội v&agrave; ph&aacute;p luật về bảo hiểm y tế.</li>
      <li>Người lao động vi phạm kỷ luật g&acirc;y thiệt hại vật chất phải bồi thường theo quy định của ph&aacute;p luật lao động, d&acirc;n sự v&agrave; phải bị xử l&yacute; kỷ luật theo nội quy lao động C&ocirc;ng ty.</li>
      </ul>
      <h3>Điều 9: Nghĩa vụ v&agrave; quyền hạn của người sử dụng lao động</h3>
      <p><strong>Quyền lợi:</strong></p>
      <ul>
      <li>Tuyển dụng, bố tr&iacute;, điều h&agrave;nh lao động theo nhu cầu sản xuất, kinh doanh; khen thưởng v&agrave; xử l&yacute; vi phạm kỷ luật lao động;</li>
      </ul>
      <p>&nbsp;</p>
      <ul>
      <li>Y&ecirc;u cầu tập thể lao động đối thoại, thương lượng, k&yacute; kết thoả ước lao động tập thể; tham gia giải quyết tranh chấp lao động, đ&igrave;nh c&ocirc;ng; trao đổi với c&ocirc;ng đo&agrave;n về c&aacute;c vấn đề trong quan hệ lao động, cải thiện đời sống vật chất v&agrave; tinh thần của người lao động;</li>
      </ul>
      <p><strong>Nghĩa vụ:</strong></p>
      <ul>
      <li>Thực hiện hợp đồng lao động, thoả ước lao động tập thể v&agrave; thoả thuận kh&aacute;c với người lao động, t&ocirc;n trọng danh dự, nh&acirc;n phẩm của người lao động;</li>
      <li>Thiết lập cơ chế v&agrave; thực hiện đối thoại với tập thể lao động tại doanh nghiệp v&agrave; thực hiện nghi&ecirc;m chỉnh quy chế d&acirc;n chủ ở cơ sở;</li>
      <li>Thực hiện c&aacute;c quy định kh&aacute;c của ph&aacute;p luật về lao động, ph&aacute;p luật về bảo hiểm x&atilde; hội v&agrave; ph&aacute;p luật về bảo hiểm y tế.</li>
      <li>Thanh to&aacute;n đầy đủ, đ&uacute;ng thời hạn c&aacute;c chế độ v&agrave; quyền lợi cho người lao động theo hợp đồng lao động, thỏa ước lao động tập thể (nếu c&oacute;).</li>
      </ul>
      <h3>Điều 10: Điều khoản thi h&agrave;nh</h3>
      <ul>
      <li>Những vấn đề về lao động kh&ocirc;ng ghi trong hợp đồng lao động n&agrave;y th&igrave; &aacute;p dụng quy định của thỏa ước lao động tập thể v&agrave; quy định ph&aacute;p luật lao động.</li>
      <li>Hợp đồng lao động được l&agrave;m th&agrave;nh 02 bản c&oacute; gi&aacute; trị ngang nhau, mỗi b&ecirc;n giữ một bản v&agrave; c&oacute; hiệu lực từ ng&agrave;y k&yacute;. Khi hai b&ecirc;n k&yacute; kết phụ lục hợp đồng lao động th&igrave; nội dung của phụ lục hợp đồng lao động cũng c&oacute; gi&aacute; trị như c&aacute;c nội dung của bản hợp đồng lao động n&agrave;y.</li>
      </ul>
      <p>&nbsp;</p>
      <p>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Người lao động</strong>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<strong>Người sử dụng lao động</strong></p>
      <p><em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (K&yacute; t&ecirc;n)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (K&yacute; t&ecirc;n, đ&oacute;ng dấu)</em></p>
      <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Ghi r&otilde; họ v&agrave; t&ecirc;n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Ghi r&otilde; họ v&agrave; t&ecirc;n</p>
      <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
      <p><strong>&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
      <p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>
                    
    </body>
    </html>			

`;
};

defmodule Weather.Darksky do
  use HTTPoison.Base
  @api_base "https://api.darksky.net/forecast"

  def get_weather(coordinates) do
    url = create_url(coordinates)

    case HTTPoison.get(url) do
      {:ok, %HTTPoison.Response{body: body, status_code: 200}} ->
        %{body: body, status_code: 200}

      {:ok, %HTTPoison.Response{status_code: 404}} ->
        %{body: "Not Found", status_code: 404}

      {:error, %HTTPoison.Error{reason: reason}} ->
        %{body: reason, status_code: 500}
    end
  end

  defp create_url(coordinates) do
    key = Application.fetch_env!(:weather, :api_key)
    "#{@api_base}/#{key}/#{coordinates.lat},#{coordinates.lon}?exclude=[minutely,flags]"
  end
end

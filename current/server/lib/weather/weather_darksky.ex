defmodule Weather.Darksky do
  use HTTPoison.Base
  @api_base "https://api.darksky.net/forecast"
  @exclusions "exclude=[minutely]"
  @units "units=auto"

  def get_weather(coordinates) do
    create_url(coordinates)
    |> HTTPoison.get()
    |> handle_response
  end

  defp handle_response({:ok, %HTTPoison.Response{body: body, status_code: 200}}) do
    %{body: body, status_code: 200}
  end

  defp handle_response({:ok, %HTTPoison.Response{status_code: 404}}) do
    %{body: "Not Found", status_code: 404}
  end

  defp handle_response({:ok, %HTTPoison.Response{status_code: 400}}) do
    %{body: "Poorly fomatted request", status_code: 400}
  end

  defp handle_response({:error, %HTTPoison.Error{reason: reason}}) do
    %{body: reason, status_code: 500}
  end

  defp create_url(coordinates) do
    key = Application.fetch_env!(:weather, :api_key)

    "#{@api_base}/#{key}/#{coordinates.latitude},#{coordinates.longitude}?#{@exclusions}&#{@units}"
  end
end
